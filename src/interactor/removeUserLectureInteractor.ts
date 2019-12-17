import { RemoveUserLectureUseCase } from '../usecase/removeUserLectureUseCase'
import { UserEntity } from '../entity/user'
import { inject, injectable } from 'inversify'
import { UserLectureRepository } from '../interface/repository/userLectureRepository'
import { types } from '../di/types'

@injectable()
export class RemoveUserLectureInteractor implements RemoveUserLectureUseCase {
  @inject(types.UserLectureRepository)
  userLectureRepository!: UserLectureRepository
  removeUserLecture(
    user: UserEntity,
    user_lecture_id: string
  ): Promise<boolean> {
    return this.userLectureRepository.removeUserLecture(user, user_lecture_id)
  }
}
