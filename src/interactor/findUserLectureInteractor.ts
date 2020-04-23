import { FindUserLectureUseCase } from '../usecase/findUserLectureUseCase'
import { UserLectureEntity } from '../entity/period'
import { inject, injectable } from 'inversify'
import { UserLectureRepository } from '../interface/repository/userLectureRepository'
import { types } from '../di/types'
import { UserEntity } from '../entity/user'

@injectable()
export class FindUserLectureInteractor implements FindUserLectureUseCase {
  @inject(types.UserLectureRepository)
  userLectureRepository!: UserLectureRepository

  findUserLecture(
    user: UserEntity,
    user_lecture_id: string
  ): Promise<UserLectureEntity | undefined> {
    return this.userLectureRepository.findUserLectureById(user, user_lecture_id)
  }

  getAllUserLectures(user: UserEntity): Promise<UserLectureEntity[]> {
    return this.userLectureRepository.getAllUserLecture(user)
  }

  getLectureCodes(user: UserEntity, year: number): Promise<string[]> {
    return this.userLectureRepository.getLectureCodes(user, year)
  }

  getUserLectureByYear(
    user: UserEntity,
    year: number
  ): Promise<UserLectureEntity[]> {
    return this.userLectureRepository.getUserLectureByYear(user, year)
  }
}
