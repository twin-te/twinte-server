import { inject, injectable } from 'inversify'
import { types } from '../../di/types'
import { SearchLectureByKeywordUseCase } from '../../usecase/SearchLectureByKeywordUseCase'
import { Lecture } from '../../entity/lecture'

@injectable()
export class LectureController {
  @inject(types.SearchLectureByKeywordUseCase)
  private searchLectureByKeywordUseCase!: SearchLectureByKeywordUseCase

  searchByKeyword(keyword: string): Promise<Lecture[]> {
    return this.searchLectureByKeywordUseCase.searchLectureByKeyword(keyword)
  }
}
