import { GetTimetableUseCase } from '../usecase/getTimetableUseCase'
import { UserEntity } from '../entity/user'
import { Day, Module } from 'twinte-parser'
import { inject, injectable } from 'inversify'
import { types } from '../di/types'
import { TimetableRepository } from '../interface/repository/timetableRepository'
import { PeriodEntity } from '../entity/period'
import moment = require('moment')
import { SchoolCalenderRepository } from '../interface/repository/schoolCalenderRepository'

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
  ): Promise<PeriodEntity[]> {
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
    const moduleTerms = await Promise.all(
      Object.entries(Module).map(async ([_, value]) =>
        this.schoolCalenderRepository.getModuleTerm(date.year(), value)
      )
    )

    const targetModule = moduleTerms
      .filter(el => el)
      .find(el => date.isBetween(el!.start, el!.end))

    if (!targetModule) return []

    const transferDates = await this.schoolCalenderRepository.getTransferDates(
      date.year()
    )
    const res = transferDates.find(el => el.date.isSame(date, 'date'))
    let targetDay: Day
    if (!res) targetDay = Object.values(Day)[date.day()]
    else targetDay = res.day

    return this.getTimetable(user, date.year(), targetModule.module, targetDay)
  }

  getTodayTimetable(user: UserEntity): Promise<PeriodEntity[]> {
    return this.getTimetableByDate(user, moment())
  }
}
