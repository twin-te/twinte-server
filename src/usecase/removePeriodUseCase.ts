import { UserEntity } from '../entity/user'
import { Day, Module } from 'twinte-parser'

export interface RemovePeriodUseCase {
  removePeriod(
    user: UserEntity,
    year: number,
    module: Module,
    day: Day,
    period: number
  ): Promise<boolean>
}
