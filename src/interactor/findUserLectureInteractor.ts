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
}
