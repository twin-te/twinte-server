import { UserEntity } from '../entity/user'
import { Day, Module } from 'twinte-parser'
import { PeriodEntity, TimetableEntity } from '../entity/period'
import { Moment } from 'moment-timezone'

export interface GetTimetableUseCase {
  getTimetable(
    user: UserEntity,
    year?: number,
    module?: Module,
    day?: Day,
    period?: number
  ): Promise<TimetableEntity[]>

  getTodayTimetable(user: UserEntity): Promise<PeriodEntity[]>

  getTimetableByDate(user: UserEntity, date: Moment): Promise<PeriodEntity[]>

  getPeriod(
    user: UserEntity,
    year: number,
    module: Module,
    day: Day,
    period: number
  ): Promise<PeriodEntity | undefined>
}
