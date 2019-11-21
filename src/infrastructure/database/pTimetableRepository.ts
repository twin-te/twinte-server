import { TimetableRepository } from '../../interface/repository/timetableRepository'
import { Day, Module } from 'twinte-parser'
import { PeriodEntity } from '../../entity/period'
import { Period as pPeriod } from './orm/period'
import { Repository } from 'typeorm'
import { getConnection } from './index'
import { UserLecture as pUserLecture } from './orm/userLecture'
import { injectable } from 'inversify'
import { User } from './orm/user'
import { User as pUser } from './orm/user'
import { UserEntity } from '../../entity/user'

@injectable()
export class PTimetableRepository implements TimetableRepository {
  periodRepository: Repository<pPeriod>
  userLectureRepository: Repository<pUserLecture>
  userRepository: Repository<pUser>

  constructor() {
    this.periodRepository = getConnection().getRepository(pPeriod)
    this.userLectureRepository = getConnection().getRepository(pUserLecture)
    this.userRepository = getConnection().getRepository(pUser)
  }

  async getTimetable(
    user: User,
    year?: number,
    module?: Module,
    day?: Day,
    period?: number
  ): Promise<PeriodEntity[]> {
    let query = this.periodRepository
      .createQueryBuilder('period')
      .leftJoinAndSelect('period.user_lecture', 'user_lecture')
      .leftJoinAndSelect('period.user', 'user')
      .where('user.twinte_user_id = :id', { id: user.twinte_user_id })
    if (year) query = query.andWhere('period.year = :year', { year })
    if (module) query = query.andWhere('period.module = :module', { module })
    if (day) query = query.andWhere('period.day = :day', { day })
    if (period) query = query.andWhere('period.period = :period', { period })
    const res = await query.getMany()
    return res.map(p => this.pPeriodToPeriod(p))
  }

  async removePeriod(
    user: User,
    year: number,
    module: Module,
    day: Day,
    period: number
  ): Promise<boolean> {
    const target = await this.periodRepository.findOne({
      user: await this.userRepository.findOne({ ...user }),
      year: year,
      module: module,
      day: day,
      period: period
    })
    if (!target) return false
    await this.periodRepository.remove(target)
    return true
  }

  async upsertPeriod(
    user: User,
    period: PeriodEntity
  ): Promise<PeriodEntity | undefined> {
    const u = await this.userRepository.findOne({ ...user })
    if (!u) throw Error('存在するはずのユーザーが存在しません')
    const target = await this.periodRepository.findOne(
      {
        user: u,
        year: period.year,
        module: period.module,
        day: period.day,
        period: period.period
      },
      { relations: ['user_lecture'] }
    )
    if (target) {
      target.room = period.room
      const res = await this.periodRepository.save(target)
      return this.pPeriodToPeriod(res)
    } else {
      const userLecture = await this.userLectureRepository.findOne(
        {
          user_lecture_id: period.user_lecture_id
        },
        { relations: ['twinte_lecture', 'periods'] }
      )

      if (!userLecture) return undefined

      const newPeriod = new pPeriod()
      newPeriod.year = period.year
      newPeriod.module = period.module
      newPeriod.day = period.day
      newPeriod.period = period.period
      newPeriod.room = period.room
      newPeriod.user_lecture = userLecture
      newPeriod.user = u

      if (!userLecture.periods) userLecture.periods = []
      userLecture.periods.push(newPeriod)
      await this.userLectureRepository.save(userLecture)

      return this.pPeriodToPeriod(newPeriod)
    }
  }

  pPeriodToPeriod(p: pPeriod): PeriodEntity {
    return {
      year: p.year,
      module: p.module,
      day: p.day,
      period: p.period,
      room: p.room,
      user_lecture_id: p.user_lecture.user_lecture_id
    }
  }

  async getPeriod(
    user: UserEntity,
    year: number,
    module: Module,
    day: Day,
    period: number
  ): Promise<PeriodEntity | undefined> {
    const res = await this.periodRepository.findOne(
      {
        user,
        year,
        module,
        day,
        period
      },
      { relations: ['user_lecture'] }
    )
    if (!res) return undefined
    return this.pPeriodToPeriod(res)
  }
}
