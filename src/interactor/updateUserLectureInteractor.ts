import { inject, injectable } from 'inversify'
import { UpdateUserLectureUseCase } from '../usecase/updateUserLectureUseCase'
import { UserEntity } from '../entity/user'
import { UserLectureEntity } from '../entity/period'
import { types } from '../di/types'
import { UserLectureRepository } from '../interface/repository/userLectureRepository'

@injectable()
export class UpdateUserLectureInteractor implements UpdateUserLectureUseCase {
  @inject(types.UserLectureRepository)
  userLectureRepository!: UserLectureRepository
  updateUserLecture(
    user: UserEntity,
    userLecture: UserLectureEntity
  ): Promise<UserLectureEntity | undefined> {
    return this.userLectureRepository.updateUserLecture(user, userLecture)
  }
}
