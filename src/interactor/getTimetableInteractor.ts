import { GetTimetableUseCase } from '../usecase/getTimetableUseCase'
import { User } from '../entity/user'
import { Day, Module } from 'twinte-parser'
import { inject, injectable } from 'inversify'
import { types } from '../di/types'
import { TimetableRepository } from '../interface/repository/timetableRepository'
import {Period} from '../entity/period'

@injectable()
export class GetTimetableInteractor implements GetTimetableUseCase {
  @inject(types.TimetableRepository) timetableRepository!: TimetableRepository

  getTimetable(
    user: User,
    year?: number,
    module?: Module,
    day?: Day
  ): Promise<Period[]> {
    return this.timetableRepository.getTimetable(user, year, module, day)
  }
}
