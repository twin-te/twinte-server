import { LectureEntity } from '../entity/lecture'

/**
 * 講義をキーワードで検索する
 */
export interface SearchLectureByKeywordUseCase {
  searchLectureByKeyword(keyword: string): Promise<LectureEntity[]>
}
