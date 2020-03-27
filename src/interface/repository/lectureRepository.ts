import { LectureEntity } from '../../entity/lecture'

/**
 * Twinteが保持する講義データベース
 */
export interface LectureRepository {
  /**
   * twinteLectureIDから講義を取得
   * @param twinteLectureId
   */
  findLectureById(twinteLectureId: string): Promise<LectureEntity | undefined>

  /**
   * キーワードから講義を検索
   * @param keyword
   */
  searchLectureByKeyword(year: number,keyword: string): Promise<LectureEntity[]>

  findLectureByLectureCode(
    year: number,
    lectureCode: string
  ): Promise<LectureEntity | undefined>

  /**
   * 講義情報を追加、更新する
   * @param lectures
   * @return 更新された講義
   */
  upsertLectures(lectures: LectureEntity[]): Promise<LectureEntity[]>
}
