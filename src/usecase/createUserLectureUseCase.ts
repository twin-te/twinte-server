import { UserLectureEntity } from '../entity/period'
import { UserEntity } from '../entity/user'
import {LectureFormat} from '../entity/lecture'

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
    instructor: string,
    credits: number,
    formats: LectureFormat[]
  ): Promise<UserLectureEntity>
}
