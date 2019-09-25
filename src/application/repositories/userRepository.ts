import passport from 'passport'
import { Period, User, UserData } from '../../domain/entities/user'
import { Day, Module } from 'twinte-parser'

/**
 * ユーザーの情報に関するレポジトリ
 */
export interface UserRepository {
  /**
   * Twitterの情報を使って新規ユーザーを作成する
   * @param profile twitter情報
   */
  createUserByTwitter(profile: passport.Profile): Promise<User>

  /**
   * ユーザーIDから取得する
   * @param id
   */
  findByID(id: string): Promise<User | null>

  /**
   * TwitterIDからユーザーを取得する
   * @param id
   */
  findByTwitterID(id: string): Promise<User | null>

  /**
   * 指定された条件の時間割を取得する
   * @param userID
   * @param year
   * @param module
   */
  getTimetable(
    userID: string,
    year?: number,
    module?: Module
  ): Promise<Period[] | null>

  /**
   * 時間割を更新する。すでに存在している時限は上書きされる。
   * @param userID
   * @param period
   */
  updateTimetable(userID: string, period: Period): Promise<Period | null>

  /**
   * 指定した時限を削除する。
   * @param userID
   * @param year
   * @param module
   * @param day
   * @param period
   */
  removeTimetable(
    userID: string,
    year: number,
    module: Module,
    day: Day,
    period: number
  ): Promise<void>

  /**
   * 指定した講義のユーザーデータを取得する
   * @param userID
   * @param lectureID
   * @param year
   */
  getUserData(
    userID: string,
    lectureID: string,
    year: number
  ): Promise<UserData | null>

  /**
   * 指定した講義のユーザーデータを更新する
   * @param userID
   * @param userData
   */
  updateUserData(userID: string, userData: UserData): Promise<UserData | null>
}
