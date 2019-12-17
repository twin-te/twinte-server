import { UserEntity } from '../entity/user'
import { UserLectureEntity } from '../entity/period'

export interface UpdateUserLectureUseCase {
  updateUserLecture(
    user: UserEntity,
    userLecture: UserLectureEntity
  ): Promise<UserLectureEntity | undefined>
}
