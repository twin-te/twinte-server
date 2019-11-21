import { inject, injectable } from 'inversify'
import { types } from '../../di/types'
import { FindLectureUseCase } from '../../usecase/FindLectureUseCase'
import { LectureEntity } from '../../entity/lecture'

@injectable()
export class LectureController {
  @inject(types.FindLectureUseCase)
  private searchLectureByKeywordUseCase!: FindLectureUseCase

  searchByKeyword(keyword: string): Promise<LectureEntity[]> {
    return this.searchLectureByKeywordUseCase.searchLectureByKeyword(keyword)
  }
}
