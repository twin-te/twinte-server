import { UserLectureEntity } from '../../entity/period'
import { UserEntity } from '../../entity/user'

export interface UserLectureRepository {
  findUserLectureById(
    user: UserEntity,
    user_lecture_id: string
  ): Promise<UserLectureEntity | undefined>
  getAllUserLecture(user: UserEntity): Promise<UserLectureEntity[]>
  getUserLectureByYear(
    user: UserEntity,
    year: number
  ): Promise<UserLectureEntity[]>
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
  removeUserLecture(user: UserEntity, user_lecture_id: string): Promise<boolean>
  getLectureCodes(user: UserEntity, year: number): Promise<string[]>
}
