import { inject, injectable } from 'inversify'
import { TYPES } from '../../inversifyTypes'
import { UserRepository } from '../repositories/userRepository'
import { Period, UserData } from '../../domain/entities/user'
import { LectureRepository } from '../repositories/lectureRepository'
import { Day, Module } from 'twinte-parser'

@injectable()
export class TimetableService {
  @inject(TYPES.UserRepository) private userRepository!: UserRepository
  @inject(TYPES.LectureRepository) private lectureRepository!: LectureRepository

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
}
