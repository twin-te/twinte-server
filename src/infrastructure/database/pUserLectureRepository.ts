import { UserLectureRepository } from '../../interface/repository/userLectureRepository'
import { UserLecture } from '../../entity/period'
import { UserLecture as pUserLecture } from './orm/userLecture'
import { Lecture as pLecture } from './orm/lecture'
import { Repository } from 'typeorm'
import { getConnection } from './index'
import uuid = require('uuid')
import { injectable } from 'inversify'
import { User } from '../../entity/user'
import { User as pUser } from './orm/user'

@injectable()
export class PUserLectureRepository implements UserLectureRepository {
  userLectureRepository: Repository<pUserLecture>
  lectureRepository: Repository<pLecture>
  userRepository: Repository<pUser>

  constructor() {
    this.userLectureRepository = getConnection().getRepository(pUserLecture)
    this.lectureRepository = getConnection().getRepository(pLecture)
    this.userRepository = getConnection().getRepository(pUser)
  }

  findUserLectureById(
    user: User,
    user_lecture_id: string
  ): Promise<UserLecture | undefined> {
    return this.userLectureRepository.findOne({
      user,
      user_lecture_id: user_lecture_id
    })
  }

  async createCustomUserLecture(
    user: User,
    year: number,
    lecture_name: string,
    instructor: string
  ): Promise<UserLecture> {
    const newUserLecture = new pUserLecture()
    newUserLecture.user_lecture_id = uuid()
    newUserLecture.lecture_name = lecture_name
    newUserLecture.instructor = instructor
    newUserLecture.attendance = 0
    newUserLecture.absence = 0
    newUserLecture.late = 0
    newUserLecture.year = year
    newUserLecture.memo = ''
    const u = await this.userRepository.findOne({ ...user })
    if (!u) throw Error('存在するはずのユーザーが見つかりません')
    newUserLecture.user = u
    return this.userLectureRepository.save(newUserLecture)
  }

  async createUserLecture(
    user: User,
    twinte_lecture_id: string
  ): Promise<UserLecture | undefined> {
    const srcLecture = await this.lectureRepository.findOne({
      twinte_lecture_id
    })
    if (!srcLecture) return undefined

    const newUserLecture = new pUserLecture()
    newUserLecture.lecture_name = srcLecture.lecture_name
    newUserLecture.user_lecture_id = uuid()
    newUserLecture.twinte_lecture = srcLecture
    newUserLecture.instructor = srcLecture.instructor
    newUserLecture.year = srcLecture.year
    newUserLecture.attendance = 0
    newUserLecture.absence = 0
    newUserLecture.late = 0
    newUserLecture.memo = ''
    const u = await this.userRepository.findOne({ ...user })
    if (!u) throw Error('存在するはずのユーザーが見つかりません')
    newUserLecture.user = u
    return await this.userLectureRepository.save(newUserLecture)
  }
}
