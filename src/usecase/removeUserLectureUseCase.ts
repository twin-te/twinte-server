import {UserEntity} from "../entity/user"

export interface RemoveUserLectureUseCase {
  removeUserLecture(user: UserEntity, user_lecture_id: string): Promise<boolean>
}
