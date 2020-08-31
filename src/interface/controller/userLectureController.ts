import { inject, injectable } from 'inversify'
import { types } from '../../di/types'
import { CreateUserLectureUseCase } from '../../usecase/createUserLectureUseCase'
import { UserEntity } from '../../entity/user'
import { UserLectureEntity } from '../../entity/period'
import { FindUserLectureUseCase } from '../../usecase/findUserLectureUseCase'
import { UpdateUserLectureUseCase } from '../../usecase/updateUserLectureUseCase'
import { RemoveUserLectureUseCase } from '../../usecase/removeUserLectureUseCase'
import { LectureFormat } from '../../entity/lecture'

@injectable()
export class UserLectureController {
  @inject(types.CreateUserLectureUseCase)
  createUserLectureUseCase!: CreateUserLectureUseCase
  @inject(types.FindUserLectureUseCase)
  findUserLectureUseCase!: FindUserLectureUseCase
  @inject(types.UpdateUserLectureUseCase)
  updateUserLectureUseCase!: UpdateUserLectureUseCase
  @inject(types.RemoveUserLectureUseCase)
  removeUserLectureUseCase!: RemoveUserLectureUseCase

  createCustomUserLecture(
    user: UserEntity,
    year: number,
    lecture_name: string,
    instructor: string,
    credits: number,
    formats: LectureFormat[]
  ): Promise<UserLectureEntity> {
    return this.createUserLectureUseCase.createCustomUserLecture(
      user,
      year,
      lecture_name,
      instructor,
      credits,
      formats
    )
  }

  findUserLecture(
    user: UserEntity,
    user_lecture_id: string
  ): Promise<UserLectureEntity | undefined> {
    return this.findUserLectureUseCase.findUserLecture(user, user_lecture_id)
  }

  getAllUserLectures(user: UserEntity): Promise<UserLectureEntity[]> {
    return this.findUserLectureUseCase.getAllUserLectures(user)
  }

  getUserLectureByYear(
    user: UserEntity,
    year: number
  ): Promise<UserLectureEntity[]> {
    return this.findUserLectureUseCase.getUserLectureByYear(user, year)
  }

  removeUserLecture(
    user: UserEntity,
    user_lecture_id: string
  ): Promise<boolean> {
    return this.removeUserLectureUseCase.removeUserLecture(
      user,
      user_lecture_id
    )
  }

  updateUserLecture(
    user: UserEntity,
    userLecture: UserLectureEntity
  ): Promise<UserLectureEntity | undefined> {
    return this.updateUserLectureUseCase.updateUserLecture(user, userLecture)
  }

  getLectureCodes(user: UserEntity, year: number): Promise<string[]> {
    return this.findUserLectureUseCase.getLectureCodes(user, year)
  }
}
