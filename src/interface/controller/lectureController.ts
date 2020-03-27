import { inject, injectable } from 'inversify'
import { types } from '../../di/types'
import { FindLectureUseCase } from '../../usecase/findLectureUseCase'
import { LectureEntity } from '../../entity/lecture'

@injectable()
export class LectureController {
  @inject(types.FindLectureUseCase)
  private searchLectureByKeywordUseCase!: FindLectureUseCase

  searchByKeyword(year: number, keyword: string): Promise<LectureEntity[]> {
    return this.searchLectureByKeywordUseCase.searchLectureByKeyword(
      year,
      keyword
    )
  }
}
