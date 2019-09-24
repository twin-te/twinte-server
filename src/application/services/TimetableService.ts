import { inject, injectable } from 'inversify'
import { TYPES } from '../../types'
import { UserRepository } from '../repositories/userRepository'
import { User, UserLectureData } from '../../domain/entities/user'
import { LectureRepository } from '../repositories/lectureRepository'
import { Lecture } from '../../domain/entities/lecture'

@injectable()
export class TimetableService {
  @inject(TYPES.UserRepository) private userRepository!: UserRepository
  @inject(TYPES.LectureRepository) private lectureRepository!: LectureRepository
  async addLectureByCustomData(
    userID: string,
    lectureData: UserLectureData
  ): Promise<UserLectureData[] | null> {
    const timetable = await this.userRepository.getTimetable(
      userID,
      lectureData.year
    )
    if (!timetable) return null

    timetable.push({
      ...lectureData,
      memo: '',
      attendance: 0,
      absence: 0,
      late: 0
    })

    return await this.userRepository.updateTimetable(
      userID,
      lectureData.year,
      timetable
    )
  }

  async addLectureByLectureID(
    userID: string,
    year: number,
    lectureID: string
  ): Promise<UserLectureData[] | null> {
    const lectureData = await this.lectureRepository.findByLectureID(
      lectureID,
      year
    )
    if (!lectureData) return null

    const timetable = await this.userRepository.getTimetable(userID, year)
    if (!timetable) return null

    timetable.push({
      ...lectureData,
      memo: '',
      attendance: 0,
      absence: 0,
      late: 0
    })

    return this.userRepository.updateTimetable(
      userID,
      lectureData.year,
      timetable
    )
  }

  async updateLecture(
    userID: string,
    year: number,
    lecture: UserLectureData
  ): Promise<UserLectureData[] | null> {
    const timetable = await this.userRepository.getTimetable(userID, year)
    if (!timetable) return null

    const index = timetable.findIndex(el => el.lectureID === lecture.lectureID)
    timetable[index] = lecture
    return this.userRepository.updateTimetable(userID, year, timetable)
  }

  async removeLecture(
    userID: string,
    year: number,
    lectureID: string
  ): Promise<UserLectureData[] | null > {
    const timetable = await this.userRepository.getTimetable(userID, year)
    if (!timetable) return null

    const index = timetable.findIndex(el => el.lectureID === lecture.lectureID)
    timetable.splice()
  }
}
