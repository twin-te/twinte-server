import { CreateUserLectureUseCase } from '../usecase/createUserLectureUseCase'
import { Period, UserLecture } from '../entity/period'
import { inject, injectable } from 'inversify'
import { UserLectureRepository } from '../interface/repository/userLectureRepository'
import { types } from '../di/types'
import { LectureRepository } from '../interface/repository/lectureRepository'
import { TimetableRepository } from '../interface/repository/timetableRepository'
import { User } from '../entity/user'

@injectable()
export class CreateUserLectureInteractor implements CreateUserLectureUseCase {
  @inject(types.UserLectureRepository)
  userLectureRepository!: UserLectureRepository
  @inject(types.LectureRepository) lectureRepository!: LectureRepository
  @inject(types.TimetableRepository) timetableRepository!: TimetableRepository

  createCustomUserLecture(
    user: User,
    year: number,
    lecture_name: string,
    instructor: string
  ): Promise<UserLecture> {
    return this.userLectureRepository.createCustomUserLecture(
      user,
      year,
      lecture_name,
      instructor
    )
  }

  async createUserLecture(
    user: User,
    year: number,
    lectureCode: string
  ): Promise<UserLecture | undefined> {
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
      const period: Period = {
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
