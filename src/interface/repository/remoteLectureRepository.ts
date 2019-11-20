import { LectureEntity } from '../../entity/lecture'

/**
 * 筑波大の講義データが保管されているデータベースから情報を取得する
 * (実質KDB)
 */
export interface RemoteLectureRepository {
  fetchRemoteDatabase(year: number): Promise<LectureEntity[]>
}
