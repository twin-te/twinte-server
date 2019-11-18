import { Lecture } from '../entity/lecture'

/**
 * 講義をキーワードで検索する
 */
export interface SearchLectureByKeywordUseCase {
  searchLectureByKeyword(keyword: string): Promise<Lecture[]>
}
