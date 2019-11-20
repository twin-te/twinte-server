import { CreateUserLectureUseCase } from '../usecase/createUserLectureUseCase'
import { PeriodEntity, UserLectureEntity } from '../entity/period'
import { inject, injectable } from 'inversify'
import { UserLectureRepository } from '../interface/repository/userLectureRepository'
import { types } from '../di/types'
import { LectureRepository } from '../interface/repository/lectureRepository'
import { TimetableRepository } from '../interface/repository/timetableRepository'
import { UserEntity } from '../entity/user'

@injectable()
export class CreateUserLectureInteractor implements CreateUserLectureUseCase {
  @inject(types.UserLectureRepository)
  userLectureRepository!: UserLectureRepository
  @inject(types.LectureRepository) lectureRepository!: LectureRepository
  @inject(types.TimetableRepository) timetableRepository!: TimetableRepository

  createCustomUserLecture(
    user: UserEntity,
    year: number,
    lecture_name: string,
    instructor: string
  ): Promise<UserLectureEntity> {
    return this.userLectureRepository.createCustomUserLecture(
      user,
      year,
      lecture_name,
      instructor
    )
  }

  async createUserLecture(
    user: UserEntity,
    year: number,
    lectureCode: string
  ): Promise<UserLectureEntity | undefined> {
    const lecture = await this.lectureRepository.findLectureByLectureCode(
      year,
      lectureCode
    )
    if (!lecture)
      throw new Error(
        `${year}年度開講の講義${lectureCode}は見つかりませんでした`
      )
    const twinte_lecture_id = lecture.twinte_lecture_id
    const userLecture = await this.userLectureRepository.createUserLecture(
      user,
      twinte_lecture_id
    )
    if (!userLecture) return undefined
    const srcLecture = await this.lectureRepository.findLectureById(
      twinte_lecture_id
    )
    if (!srcLecture) return undefined

    for (let i = 0; i < srcLecture.details.length; i++) {
      const d = srcLecture.details[i]
      const period: PeriodEntity = {
        year: srcLecture.year,
        module: d.module,
        day: d.day,
        period: d.period,
        room: d.room,
        user_lecture_id: userLecture.user_lecture_id
      }
      await this.timetableRepository.upsertPeriod(user, period)
    }

    return userLecture
  }
}
