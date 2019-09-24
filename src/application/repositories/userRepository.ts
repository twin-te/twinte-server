import passport from 'passport'
import { User, UserLectureData } from '../../domain/entities/user'
import { Module, Day } from 'twinte-parser'

export interface UserRepository {
  createUserByTwitter(profile: passport.Profile): Promise<User>
  findByID(id: string): Promise<User | null>
  findByTwitterID(id: string): Promise<User | null>
  getTimetable(userID: string, year?: number, module?: Module): Promise<UserLectureData[] | null>
  updateTimetable(
    userID: string,
    year: number,
    module: Module
  ): Promise<UserLectureData[] | null>
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
