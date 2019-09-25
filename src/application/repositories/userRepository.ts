import passport from 'passport'
import { Period, User, UserData } from '../../domain/entities/user'
import { Day, Module } from 'twinte-parser'

export interface UserRepository {
  createUserByTwitter(profile: passport.Profile): Promise<User>
  findByID(id: string): Promise<User | null>
  findByTwitterID(id: string): Promise<User | null>
  getTimetable(
    userID: string,
    year?: number,
    module?: Module
  ): Promise<Period[] | null>
  updateTimetable(userID: string, period: Period): Promise<Period | null>
  removeTimetable(
    userID: string,
    year: number,
    module: Module,
    day: Day,
    period: number
  ): Promise<void>
  getUserData(
    userID: string,
    lectureID: string,
    year: number
  ): Promise<UserData | null>
  updateUserData(userID: string, userData: UserData): Promise<UserData | null>

  // addLectureByCustomData(
  //   userID: string,
  //   lectureData: UserLectureData
  // ): Promise<UserLectureData[] | null>
  // addLectureByLectureID(
  //   userID: string,
  //   year: number,
  //   lectureID: string
  // ): Promise<UserLectureData[]>
  // updateLecture(
  //   userID: string,
  //   year: number,
  //   lecture: UserLectureData
  // ): Promise<UserLectureData[]>
  // removeLecture(
  //   userID: string,
  //   year: number,
  //   lectureID: string
  // ): Promise<UserLectureData[]>
}
