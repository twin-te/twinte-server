import { RemovePeriodUseCase } from './removePeriodUseCase'
import { UserEntity } from '../entity/user'
import { PeriodEntity } from '../entity/period'
import { inject, injectable } from 'inversify'
import { types } from '../di/types'
import { TimetableRepository } from '../interface/repository/timetableRepository'

@injectable()
export class RemovePeriodInteractor implements RemovePeriodUseCase {
  @inject(types.TimetableRepository) timetableRepository!: TimetableRepository

  removePeriod(user: UserEntity, period: PeriodEntity): Promise<boolean> {
    return this.timetableRepository.removePeriod(user, period)
  }
}
