import { UserLectureEntity } from '../entity/period'
import { UserEntity } from '../entity/user'

export interface FindUserLectureUseCase {
  findUserLecture(
    user: UserEntity,
    user_lecture_id: string
  ): Promise<UserLectureEntity | undefined>
  getUserLectureByYear(
    user: UserEntity,
    year: number
  ): Promise<UserLectureEntity[]>
  getAllUserLectures(user: UserEntity): Promise<UserLectureEntity[]>
  getLectureCodes(user: UserEntity, year: number): Promise<string[]>
}
