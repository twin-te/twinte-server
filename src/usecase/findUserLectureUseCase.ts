import {UserLectureEntity} from '../entity/period'
import {UserEntity} from '../entity/user'

export interface FindUserLectureUseCase {
  findUserLecture(user:UserEntity,user_lecture_id: string): Promise<UserLectureEntity | undefined>
}
