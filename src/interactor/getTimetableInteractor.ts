import { GetTimetableUseCase } from '../usecase/getTimetableUseCase'
import { UserEntity } from '../entity/user'
import { Day, Module } from 'twinte-parser'
import { inject, injectable } from 'inversify'
import { types } from '../di/types'
import { TimetableRepository } from '../interface/repository/timetableRepository'
import { PeriodEntity } from '../entity/period'

@injectable()
export class GetTimetableInteractor implements GetTimetableUseCase {
  @inject(types.TimetableRepository) timetableRepository!: TimetableRepository

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
}
