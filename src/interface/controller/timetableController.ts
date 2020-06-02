import { inject, injectable } from 'inversify'
import {
  PeriodEntity,
  TimetableEntity,
  UserLectureEntity
} from '../../entity/period'
import { types } from '../../di/types'
import { CreateUserLectureUseCase } from '../../usecase/createUserLectureUseCase'
import { UserEntity } from '../../entity/user'
import { Day, Module } from 'twinte-parser'
import { GetTimetableUseCase } from '../../usecase/getTimetableUseCase'
import { UpsertPeriodUseCase } from '../../usecase/upsertPeriodUseCase'
import { RemovePeriodUseCase } from '../../usecase/removePeriodUseCase'
import { FindUserLectureUseCase } from '../../usecase/findUserLectureUseCase'
import { FindLectureUseCase } from '../../usecase/findLectureUseCase'

import moment from 'moment-timezone'

export interface OutputPeriodData extends PeriodEntity {
  lecture_code: string | null
  lecture_name: string
  instructor: string
}

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
  @inject(types.FindUserLectureUseCase)
  findUserLectureUseCase!: FindUserLectureUseCase
  @inject(types.FindLectureUseCase)
  findLectureUseCase!: FindLectureUseCase

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
  ): Promise<TimetableEntity[]> {
    const res = await this.getTimetableUseCase.getTimetable(
      user,
      year,
      module,
      day,
      period
    )
    return res
  }

  async getTodayTimetable(user: UserEntity): Promise<PeriodEntity[]> {
    const res = await this.getTimetableUseCase.getTodayTimetable(user)
    return Promise.all(res.map(p => this.addLectureData(user, p)))
  }

  async getTimetableByDate(user: UserEntity, date: string) {
    const res = await this.getTimetableUseCase.getTimetableByDate(
      user,
      moment(date)
    )
    return Promise.all(res.map(p => this.addLectureData(user, p)))
  }

  async getPeriod(
    user: UserEntity,
    year: number,
    module: Module,
    day: Day,
    period: number
  ): Promise<OutputPeriodData | undefined> {
    const res = await this.getTimetableUseCase.getPeriod(
      user,
      year,
      module,
      day,
      period
    )
    if (!res) return undefined
    return this.addLectureData(user, res)
  }

  async upsertPeriod(
    user: UserEntity,
    period: PeriodEntity
  ): Promise<OutputPeriodData | undefined> {
    const res = await this.upsertPeriodUseCase.upsertPeriod(user, period)
    if (!res) return undefined
    return this.addLectureData(user, res)
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

  private async addLectureData(
    user: UserEntity,
    periodEntity: PeriodEntity
  ): Promise<OutputPeriodData> {
    const userLecture = await this.findUserLectureUseCase.findUserLecture(
      user,
      periodEntity.user_lecture_id
    )

    if (!userLecture)
      throw new Error('存在するはずのユーザー講義が取得できませんでした')

    //カスタム講義の場合
    if (!userLecture.twinte_lecture_id) {
      return {
        ...periodEntity,
        lecture_code: null,
        lecture_name: userLecture.lecture_name,
        instructor: userLecture.instructor
      }
    }
    const twinteLecture = await this.findLectureUseCase.findLectureByLectureID(
      userLecture.twinte_lecture_id
    )

    if (!twinteLecture)
      throw new Error('存在するはずの講義が取得できませんでした')

    return {
      ...periodEntity,
      lecture_code: twinteLecture.lectureCode,
      lecture_name: userLecture.lecture_name,
      instructor: userLecture.instructor
    }
  }
}
