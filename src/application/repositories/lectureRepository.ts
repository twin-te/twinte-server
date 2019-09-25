import { Lecture } from '../../domain/entities/lecture'

/**
 * 講義を取得するレポジトリ
 */
export interface LectureRepository {
  /**
   * 講義のデータベースを更新する
   * @param lectures 新しい講義情報
   */
  updateAll(lectures: Lecture[]): Promise<void>

  /**
   * 名前で講義を検索する
   * @param q 名前
   * @param year 年度
   */
  searchByName(q: string, year: number): Promise<Lecture[]>

  /**
   * 講義IDから講義情報を取得する
   * @param lectureID 講義ID
   * @param year 年度
   */
  findByLectureID(lectureID: string, year: number): Promise<Lecture | null>

  /**
   * 指定された年度の講義のデータベースが空か
   * @param year 年度
   */
  isEmpty(year: number): Promise<boolean>
}
