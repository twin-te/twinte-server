import { inject, injectable } from 'inversify'
import { Period, UserLecture } from '../../entity/period'
import { types } from '../../di/types'
import { CreateUserLectureUseCase } from '../../usecase/createUserLectureUseCase'
import { User } from '../../entity/user'
import { Day, Module } from 'twinte-parser'
import { GetTimetableUseCase } from '../../usecase/getTimetableUseCase'

@injectable()
export class TimetableController {
  @inject(types.CreateUserLectureUseCase)
  createUserLectureUseCase!: CreateUserLectureUseCase
  @inject(types.GetTimetableUseCase)
  getTimetableUseCase!: GetTimetableUseCase

  async registerLecture(
    user: User,
    year: number,
    lectureCode: string
  ): Promise<UserLecture | undefined> {
    return this.createUserLectureUseCase.createUserLecture(
      user,
      year,
      lectureCode
    )
  }

  async getTimetable(
    user: User,
    year?: number,
    module?: Module,
    day?: Day
  ): Promise<Period[]> {
    return this.getTimetableUseCase.getTimetable(user, year, module, day)
  }
}
