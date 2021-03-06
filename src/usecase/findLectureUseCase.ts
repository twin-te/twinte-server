import { LectureEntity } from '../entity/lecture'

/**
 * 講義をキーワードで検索する
 */
export interface FindLectureUseCase {
  searchLectureByKeyword(
    year: number,
    keyword: string
  ): Promise<LectureEntity[]>

  findLectureByLectureID(
    twinte_lecture_id: string
  ): Promise<LectureEntity | undefined>
}
