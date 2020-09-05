import { UpsertPeriodUseCase } from '../usecase/upsertPeriodUseCase'
import { PeriodEntity } from '../entity/period'
import { inject, injectable } from 'inversify'
import { types } from '../di/types'
import { TimetableRepository } from '../interface/repository/timetableRepository'
import { UserEntity } from '../entity/user'

@injectable()
export class UpsertPeriodInteractor implements UpsertPeriodUseCase {
  @inject(types.TimetableRepository) timetableRepository!: TimetableRepository
  upsertPeriod(
    user: UserEntity,
    period: PeriodEntity
  ): Promise<PeriodEntity | undefined> {
    return this.timetableRepository.upsertPeriod(user, period)
  }
}
