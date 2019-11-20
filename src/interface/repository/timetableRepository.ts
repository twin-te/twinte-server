import { Day, Module } from 'twinte-parser'
import { PeriodEntity } from '../../entity/period'
import { UserEntity } from '../../entity/user'

export interface TimetableRepository {
  getTimetable(
    user: UserEntity,
    year?: number,
    module?: Module,
    day?: Day
  ): Promise<PeriodEntity[]>

  upsertPeriod(
    user: UserEntity,
    period: PeriodEntity
  ): Promise<PeriodEntity | undefined>

  removePeriod(user: UserEntity, period: PeriodEntity): Promise<boolean>
}
