import { UserLectureRepository } from '../../interface/repository/userLectureRepository'
import { UserLectureEntity } from '../../entity/period'
import { UserLecture as pUserLecture } from './orm/userLecture'
import { Lecture as pLecture } from './orm/lecture'
import { UserLectureFormat as pFormat } from './orm/userLectureFormat'
import { Repository } from 'typeorm'
import { getConnection } from './index'
import uuid = require('uuid')
import { injectable } from 'inversify'
import { UserEntity } from '../../entity/user'
import { User as pUser } from './orm/user'
import { Period as pPeriod } from './orm/period'
import { LectureFormat } from '../../entity/lecture'
import { UserLectureFormat } from './orm/userLectureFormat'

@injectable()
export class PUserLectureRepository implements UserLectureRepository {
  userLectureRepository: Repository<pUserLecture>
  lectureRepository: Repository<pLecture>
  userRepository: Repository<pUser>
  periodRepository: Repository<pPeriod>
  formatRepository: Repository<pFormat>

  constructor() {
    this.userLectureRepository = getConnection().getRepository(pUserLecture)
    this.lectureRepository = getConnection().getRepository(pLecture)
    this.userRepository = getConnection().getRepository(pUser)
    this.periodRepository = getConnection().getRepository(pPeriod)
    this.formatRepository = getConnection().getRepository(pFormat)
  }

  async getUserLectureByYear(
    user: UserEntity,
    year: number
  ): Promise<UserLectureEntity[]> {
    const res = await this.userLectureRepository.find({
      where: { user, year },
      relations: ['twinte_lecture', 'formats']
    })
    return res.map(el => this.pUserLectureToUserLecture(el))
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
      { relations: ['twinte_lecture', 'formats'] }
    )
    if (!res) return undefined
    return this.pUserLectureToUserLecture(res)
  }

  async getAllUserLecture(user: UserEntity): Promise<UserLectureEntity[]> {
    const res = await this.userLectureRepository.find({
      where: { user },
      relations: ['twinte_lecture', 'formats']
    })
    return res.map(el => this.pUserLectureToUserLecture(el))
  }

  async createCustomUserLecture(
    user: UserEntity,
    year: number,
    lecture_name: string,
    instructor: string,
    credits: number,
    formats: LectureFormat[]
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
    newUserLecture.credits = credits
    newUserLecture.formats = formats.map(e => {
      const f = new UserLectureFormat()
      f.format = e
      return f
    })
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
    const srcLecture = await this.lectureRepository.findOne(
      {
        twinte_lecture_id
      },
      { relations: ['formats'] }
    )
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
    newUserLecture.formats = srcLecture.formats.map(e => {
      const f = new UserLectureFormat()
      f.format = e.format
      return f
    })
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
      { relations: ['twinte_lecture', 'formats'] }
    )
    if (!target)
      throw Error('指定されたユーザー講義は存在しないため、更新できません')
    target.lecture_name = userLecture.lecture_name
    target.instructor = userLecture.instructor
    target.absence = userLecture.absence
    target.attendance = userLecture.attendance
    target.late = userLecture.late
    target.memo = userLecture.memo
    target.credits = userLecture.credits
    await Promise.all(target.formats.map(f => this.formatRepository.delete(f)))
    target.formats = userLecture.formats.map(e => {
      const f = new UserLectureFormat()
      f.format = e
      return f
    })
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
      { relations: ['periods', 'formats'] }
    )
    if (!target) throw Error('指定された講義が見つかりません')

    // userLectureを削除する前にperiodsを先に消す
    await this.periodRepository.remove(target.periods)

    await Promise.all(target.formats.map(f => this.formatRepository.delete(f)))
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
      credits: Number(p.credits), //numeric型は厳密にjsのnumber型で表せないためstringで帰ってくる
      formats: p.formats.map(f => f.format)
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
