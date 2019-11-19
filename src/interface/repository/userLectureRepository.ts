import { UserLecture } from '../../entity/period'
import { User } from '../../entity/user'

export interface UserLectureRepository {
  findUserLectureById(
    user: User,
    user_lecture_id: string
  ): Promise<UserLecture | undefined>
  createCustomUserLecture(
    user: User,
    year: number,
    lecture_name: string,
    instructor: string
  ): Promise<UserLecture>
  createUserLecture(
    user: User,
    twinte_lecture_id: string
  ): Promise<UserLecture | undefined>
}
