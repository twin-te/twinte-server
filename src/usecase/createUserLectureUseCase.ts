import { UserLectureEntity } from '../entity/period'
import { UserEntity } from '../entity/user'

export interface CreateUserLectureUseCase {
  createUserLecture(
    user: UserEntity,
    year: number,
    lectureCode: string
  ): Promise<UserLectureEntity | undefined>
  createCustomUserLecture(
    user: UserEntity,
    year: number,
    lecture_name: string,
    instructor: string
  ): Promise<UserLectureEntity>
}
