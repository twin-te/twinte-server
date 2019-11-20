import { inject, injectable } from 'inversify'
import { types } from '../../di/types'
import { CreateUserLectureUseCase } from '../../usecase/createUserLectureUseCase'
import { UserEntity } from '../../entity/user'
import { UserLectureEntity } from '../../entity/period'
import { FindUserLectureUseCase } from '../../usecase/findUserLectureUseCase'
import { UpdateUserLectureUseCase } from '../../usecase/updateUserLectureUseCase'

@injectable()
export class UserLectureController {
  @inject(types.CreateUserLectureUseCase)
  createUserLectureUseCase!: CreateUserLectureUseCase
  @inject(types.FindUserLectureUseCase)
  findUserLectureUseCase!: FindUserLectureUseCase
  @inject(types.UpdateUserLectureUseCase)
  updateUserLectureUseCase!: UpdateUserLectureUseCase

  createCustomUserLecture(
    user: UserEntity,
    year: number,
    lecture_name: string,
    instructor: string
  ): Promise<UserLectureEntity> {
    return this.createUserLectureUseCase.createCustomUserLecture(
      user,
      year,
      lecture_name,
      instructor
    )
  }

  findUserLecture(
    user: UserEntity,
    user_lecture_id: string
  ): Promise<UserLectureEntity | undefined> {
    return this.findUserLectureUseCase.findUserLecture(user, user_lecture_id)
  }

  updateUserLecture(
    user: UserEntity,
    userLecture: UserLectureEntity
  ): Promise<UserLectureEntity | undefined> {
    return this.updateUserLectureUseCase.updateUserLecture(user, userLecture)
  }
}
