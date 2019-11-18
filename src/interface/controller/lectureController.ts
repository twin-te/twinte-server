import { inject, injectable } from 'inversify'
import { types } from '../../di/types'
import { SearchLectureByKeywordUseCase } from '../../usecase/SearchLectureByKeywordUseCase'
import { Lecture } from '../../domain/lecture'

@injectable()
export class LectureController {
  @inject(types.SearchLectureByKeywordUseCase)
  searchLectureByKeywordUseCase!: SearchLectureByKeywordUseCase

  searchByKeyword(keyword: string): Promise<Lecture[]> {
    return this.searchLectureByKeywordUseCase.searchLectureByKeyword(keyword)
  }
}
