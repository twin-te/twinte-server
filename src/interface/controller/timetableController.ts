import { inject, injectable } from 'inversify'
import { PeriodEntity, UserLectureEntity } from '../../entity/period'
import { types } from '../../di/types'
import { CreateUserLectureUseCase } from '../../usecase/createUserLectureUseCase'
import { UserEntity } from '../../entity/user'
import { Day, Module } from 'twinte-parser'
import { GetTimetableUseCase } from '../../usecase/getTimetableUseCase'
import { UpsertPeriodUseCase } from '../../usecase/upsertPeriodUseCase'
import { RemovePeriodUseCase } from '../../usecase/removePeriodUseCase'

@injectable()
export class TimetableController {
  @inject(types.CreateUserLectureUseCase)
  createUserLectureUseCase!: CreateUserLectureUseCase
  @inject(types.GetTimetableUseCase)
  getTimetableUseCase!: GetTimetableUseCase
  @inject(types.UpsertPeriodUseCae)
  upsertPeriodUseCase!: UpsertPeriodUseCase
  @inject(types.RemovePeriodUseCase)
  removePeriodUseCase!: RemovePeriodUseCase

  async registerLecture(
    user: UserEntity,
    year: number,
    lectureCode: string
  ): Promise<UserLectureEntity | undefined> {
    return this.createUserLectureUseCase.createUserLecture(
      user,
      year,
      lectureCode
    )
  }

  async getTimetable(
    user: UserEntity,
    year?: number,
    module?: Module,
    day?: Day,
    period?: number
  ): Promise<PeriodEntity[]> {
    return this.getTimetableUseCase.getTimetable(
      user,
      year,
      module,
      day,
      period
    )
  }

  async getPeriod(
    user: UserEntity,
    year: number,
    module: Module,
    day: Day,
    period: number
  ): Promise<PeriodEntity | undefined> {
    return this.getTimetableUseCase.getPeriod(user, year, module, day, period)
  }

  upsertPeriod(
    user: UserEntity,
    period: PeriodEntity
  ): Promise<PeriodEntity | undefined> {
    return this.upsertPeriodUseCase.upsertPeriod(user, period)
  }

  removePeriod(
    user: UserEntity,
    year: number,
    module: Module,
    day: Day,
    period: number
  ): Promise<boolean> {
    return this.removePeriodUseCase.removePeriod(
      user,
      year,
      module,
      day,
      period
    )
  }
}
