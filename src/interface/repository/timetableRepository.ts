import { Day, Module } from 'twinte-parser'
import { PeriodEntity } from '../../entity/period'
import { UserEntity } from '../../entity/user'

export interface TimetableRepository {
  getTimetable(
    user: UserEntity,
    year?: number,
    module?: Module,
    day?: Day,
    period?: number
  ): Promise<PeriodEntity[]>

  getPeriod(
    user: UserEntity,
    year: number,
    module: Module,
    day: Day,
    period: number
  ): Promise<PeriodEntity | undefined>

  upsertPeriod(
    user: UserEntity,
    period: PeriodEntity
  ): Promise<PeriodEntity | undefined>

  removePeriod(
    user: UserEntity,
    year: number,
    module: Module,
    day: Day,
    period: number
  ): Promise<boolean>
}
