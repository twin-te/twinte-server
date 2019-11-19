import { UserLecture } from '../entity/period'
import { User } from '../entity/user'

export interface CreateUserLectureUseCase {
  createUserLecture(
    user: User,
    year: number,
    lectureCode: string
  ): Promise<UserLecture | undefined>
  createCustomUserLecture(
    user: User,
    year: number,
    lecture_name: string,
    instructor: string
  ): Promise<UserLecture>
}
