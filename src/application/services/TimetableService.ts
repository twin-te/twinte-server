import { inject, injectable } from 'inversify'
import { TYPES } from '../../inversifyTypes'
import { UserRepository } from '../repositories/userRepository'
import { Period } from '../../domain/entities/user'
import { LectureRepository } from '../repositories/lectureRepository'
import { Day, Module } from 'twinte-parser'
import { ScheduleRepository } from '../repositories/scheduleRepository'
import moment = require('moment')

@injectable()
export class TimetableService {
  @inject(TYPES.UserRepository) private userRepository!: UserRepository
  @inject(TYPES.LectureRepository) private lectureRepository!: LectureRepository
  @inject(TYPES.ScheduleRepository)
  private scheduleRepository!: ScheduleRepository

  async updatePeriodByLectureID(
    userID: string,
    lectureID: string,
    year: number
  ) {
    const lecture = await this.lectureRepository.findByLectureID(
      lectureID,
      year
    )
    if (!lecture) return
    const periods: Period[] = lecture.details.map<Period>(d => ({
      period: d.period,
      day: d.day,
      module: d.module,
      room: d.room,
      year,
      lectureID: lecture.lectureID,
      name: lecture.name,
      instructor: lecture.instructor
    }))
    await Promise.all(
      periods.map(el => this.userRepository.updateTimetable(userID, el))
    )
  }

  async updatePeriodByCustomData(userID: string, period: Period) {
    return this.userRepository.updateTimetable(userID, period)
  }

  async removePeriod(
    userID: string,
    year: number,
    module: Module,
    day: Day,
    period: number
  ) {
    return this.userRepository.removeTimetable(
      userID,
      year,
      module,
      day,
      period
    )
  }

  async getTimetable(userID: string, year?: number, module?: Module) {
    return this.userRepository.getTimetable(userID, year, module)
  }

  async getTimetableByDate(userID: string, date: moment.Moment) {
    const moduleSchedules = await this.scheduleRepository.getModuleSchedule()
    const nowModule = moduleSchedules.find(el =>
      date.isBetween(el.start, el.end)
    )
    const hoge = await this.scheduleRepository.getTransferDays()
    const transferDate = (await this.scheduleRepository.getTransferDays()).find(
      el => el.date.isSame(date, 'day')
    )
    const nowDay = transferDate
      ? transferDate.transferDay
      : (date.format('dd') as Day)
    const timetable = await this.getTimetable(
      userID,
      date.year(),
      nowModule!.module
    )
    return timetable!.filter(el => el.day === nowDay)
  }

  async getTodayTimetable(userID: string) {
    return this.getTimetableByDate(userID, moment())
  }
}
