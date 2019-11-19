import { Day, Module } from 'twinte-parser'
import { Period } from '../../entity/period'
import { User } from '../../entity/user'

export interface TimetableRepository {
  getTimetable(
    user: User,
    year?: number,
    module?: Module,
    day?: Day
  ): Promise<Period[]>

  upsertPeriod(user: User, period: Period): Promise<Period | undefined>

  removePeriod(
    user: User,
    year: number,
    module: Module,
    day: Day,
    period: number
  ): Promise<boolean>
}
