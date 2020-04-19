import { UserLectureRepository } from '../../interface/repository/userLectureRepository'
import { UserLectureEntity } from '../../entity/period'
import { UserLecture as pUserLecture } from './orm/userLecture'
import { Lecture as pLecture } from './orm/lecture'
import { Repository } from 'typeorm'
import { getConnection } from './index'
import uuid = require('uuid')
import { injectable } from 'inversify'
import { UserEntity } from '../../entity/user'
import { User as pUser } from './orm/user'
import { Period as pPeriod } from './orm/period'

@injectable()
export class PUserLectureRepository implements UserLectureRepository {
  userLectureRepository: Repository<pUserLecture>
  lectureRepository: Repository<pLecture>
  userRepository: Repository<pUser>
  periodRepository: Repository<pPeriod>

  constructor() {
    this.userLectureRepository = getConnection().getRepository(pUserLecture)
    this.lectureRepository = getConnection().getRepository(pLecture)
    this.userRepository = getConnection().getRepository(pUser)
    this.periodRepository = getConnection().getRepository(pPeriod)
  }

  async findUserLectureById(
    user: UserEntity,
    user_lecture_id: string
  ): Promise<UserLectureEntity | undefined> {
    const res = await this.userLectureRepository.findOne(
      {
        user,
        user_lecture_id: user_lecture_id
      },
      { relations: ['twinte_lecture'] }
    )
    if (!res) return undefined
    return this.pUserLectureToUserLecture(res)
  }

  async getAllUserLecture(user: UserEntity): Promise<UserLectureEntity[]> {
    const res = await this.userLectureRepository.find({
      where: { user },
      relations: ['twinte_lecture']
    })
    return res.map(el => this.pUserLectureToUserLecture(el))
  }

  async createCustomUserLecture(
    user: UserEntity,
    year: number,
    lecture_name: string,
    instructor: string
  ): Promise<UserLectureEntity> {
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
    return this.pUserLectureToUserLecture(
      await this.userLectureRepository.save(newUserLecture)
    )
  }

  async createUserLecture(
    user: UserEntity,
    twinte_lecture_id: string
  ): Promise<UserLectureEntity | undefined> {
    const srcLecture = await this.lectureRepository.findOne({
      twinte_lecture_id
    })
    if (!srcLecture) return undefined

    const exist = await this.userLectureRepository.findOne({
      twinte_lecture: { twinte_lecture_id },
      user
    })

    if (exist) throw new Error('この講義は既に存在します')

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
    newUserLecture.credits = srcLecture.credits
    const u = await this.userRepository.findOne({ ...user })
    if (!u) throw Error('存在するはずのユーザーが見つかりません')
    newUserLecture.user = u
    return this.pUserLectureToUserLecture(
      await this.userLectureRepository.save(newUserLecture)
    )
  }

  async updateUserLecture(
    user: UserEntity,
    userLecture: UserLectureEntity
  ): Promise<UserLectureEntity | undefined> {
    const target = await this.userLectureRepository.findOne(
      {
        user,
        user_lecture_id: userLecture.user_lecture_id
      },
      { relations: ['twinte_lecture'] }
    )
    if (!target)
      throw Error('指定されたユーザー講義は存在しないため、更新できません')
    target.lecture_name = userLecture.lecture_name
    target.instructor = userLecture.instructor
    target.absence = userLecture.absence
    target.attendance = userLecture.attendance
    target.late = userLecture.late
    target.memo = userLecture.memo
    return this.pUserLectureToUserLecture(
      await this.userLectureRepository.save(target)
    )
  }

  async removeUserLecture(
    user: UserEntity,
    user_lecture_id: string
  ): Promise<boolean> {
    const target = await this.userLectureRepository.findOne(
      {
        user,
        user_lecture_id
      },
      { relations: ['periods'] }
    )
    if (!target) throw Error('指定された講義が見つかりません')

    // userLectureを削除する前にperiodsを先に消す
    await this.periodRepository.remove(target.periods)

    // 最後に本体を消す
    await this.userLectureRepository.remove(target)
    return true
  }

  pUserLectureToUserLecture(p: pUserLecture): UserLectureEntity {
    return {
      twinte_lecture_id: p.twinte_lecture
        ? p.twinte_lecture.twinte_lecture_id
        : null,
      user_lecture_id: p.user_lecture_id,
      year: p.year,
      attendance: p.attendance,
      absence: p.absence,
      late: p.late,
      memo: p.memo,
      lecture_name: p.lecture_name,
      instructor: p.instructor,
      credits: p.credits
    }
  }

  async getLectureCodes(user: UserEntity, year: number): Promise<string[]> {
    const res = await this.userLectureRepository.find({
      where: { user, year },
      relations: ['twinte_lecture']
    })
    return res
      .map(ul => ul.twinte_lecture?.lecture_code)
      .filter(e => e)
      .map(e => e!!)
  }
}
