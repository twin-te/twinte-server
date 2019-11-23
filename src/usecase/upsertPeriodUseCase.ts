import { PeriodEntity } from '../entity/period'
import { UserEntity } from '../entity/user'

export interface UpsertPeriodUseCase {
  upsertPeriod(
    user: UserEntity,
    period: PeriodEntity
  ): Promise<PeriodEntity | undefined>
}
