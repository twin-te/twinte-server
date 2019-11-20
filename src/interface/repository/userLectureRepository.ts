import { UserLectureEntity } from '../../entity/period'
import { UserEntity } from '../../entity/user'

export interface UserLectureRepository {
  findUserLectureById(
    user: UserEntity,
    user_lecture_id: string
  ): Promise<UserLectureEntity | undefined>
  createCustomUserLecture(
    user: UserEntity,
    year: number,
    lecture_name: string,
    instructor: string
  ): Promise<UserLectureEntity>
  createUserLecture(
    user: UserEntity,
    twinte_lecture_id: string
  ): Promise<UserLectureEntity | undefined>

  updateUserLecture(
    user: UserEntity,
    userLecture: UserLectureEntity
  ): Promise<UserLectureEntity | undefined>
}
