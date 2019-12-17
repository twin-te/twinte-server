import { GetTimetableUseCase } from '../usecase/getTimetableUseCase'
import { UserEntity } from '../entity/user'
import { Day, Module } from 'twinte-parser'
import { inject, injectable } from 'inversify'
import { types } from '../di/types'
import { TimetableRepository } from '../interface/repository/timetableRepository'
import { PeriodEntity, TimetableEntity } from '../entity/period'
import { SchoolCalenderRepository } from '../interface/repository/schoolCalenderRepository'
import { EventType } from '../entity/event'

import moment from 'moment'

@injectable()
export class GetTimetableInteractor implements GetTimetableUseCase {
  @inject(types.TimetableRepository) timetableRepository!: TimetableRepository
  @inject(types.SchoolCalenderRepository)
  schoolCalenderRepository!: SchoolCalenderRepository

  getTimetable(
    user: UserEntity,
    year?: number,
    module?: Module,
    day?: Day,
    period?: number
  ): Promise<TimetableEntity[]> {
    return this.timetableRepository.getTimetable(
      user,
      year,
      module,
      day,
      period
    )
  }

  getPeriod(
    user: UserEntity,
    year: number,
    module: Module,
    day: Day,
    period: number
  ): Promise<PeriodEntity | undefined> {
    return this.timetableRepository.getPeriod(user, year, module, day, period)
  }

  async getTimetableByDate(
    user: UserEntity,
    date: moment.Moment
  ): Promise<PeriodEntity[]> {
    // 年度
    const nendo = date.month() < 4 ? date.year() - 1 : date.year()

    const moduleTerms = await this.schoolCalenderRepository.getModuleTerms(
      nendo
    )

    const targetModule = moduleTerms
      .filter(el => el)
      .find(
        el =>
          date.isBetween(el!.start, el!.end) ||
          date.isSame(el!.start) ||
          date.isSame(el!.end)
      )

    if (!targetModule) return []

    const substituteDates = await this.schoolCalenderRepository.getSubstituteDays(
      date.year()
    )

    const schoolEvents = await this.schoolCalenderRepository.getEvents(
      date.year()
    )

    // 今日が休日かどうか
    const eToday = schoolEvents.find(
      el =>
        el.date.isSame(date, 'date') &&
        (el.event_type === EventType.PublicHoliday ||
          el.event_type === EventType.Holiday)
    )

    // 休日だったらからの時間割を返す
    if (eToday) return []

    // 今日が振替授業かどうか
    const sToday = substituteDates.find(el => el.date.isSame(date, 'date'))
    let targetDay: Day

    // 振替授業だったら曜日を振替曜日に変更
    if (!sToday) targetDay = Object.values(Day)[date.day()]
    else targetDay = sToday.change_to

    return this.getTimetable(user, nendo, targetModule.module, targetDay)
  }

  getTodayTimetable(user: UserEntity): Promise<PeriodEntity[]> {
    return this.getTimetableByDate(user, moment())
  }
}
