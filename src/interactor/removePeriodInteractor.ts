import { RemovePeriodUseCase } from '../usecase/removePeriodUseCase'
import { UserEntity } from '../entity/user'
import { inject, injectable } from 'inversify'
import { types } from '../di/types'
import { TimetableRepository } from '../interface/repository/timetableRepository'
import { Day, Module } from 'twinte-parser'

@injectable()
export class RemovePeriodInteractor implements RemovePeriodUseCase {
  @inject(types.TimetableRepository) timetableRepository!: TimetableRepository

  removePeriod(
    user: UserEntity,
    year: number,
    module: Module,
    day: Day,
    period: number
  ): Promise<boolean> {
    return this.timetableRepository.removePeriod(
      user,
      year,
      module,
      day,
      period
    )
  }
}
