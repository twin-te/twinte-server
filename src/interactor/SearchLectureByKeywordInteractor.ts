import { inject, injectable } from 'inversify'
import { SearchLectureByKeywordUseCase } from '../usecase/SearchLectureByKeywordUseCase'
import { LectureEntity } from '../entity/lecture'
import { types } from '../di/types'
import { LectureRepository } from '../interface/repository/lectureRepository'

@injectable()
export class SearchLectureByKeywordInteractor
  implements SearchLectureByKeywordUseCase {
  @inject(types.LectureRepository) private lectureRepository!: LectureRepository
  async searchLectureByKeyword(keyword: string): Promise<LectureEntity[]> {
    return this.lectureRepository.searchLectureByKeyword(keyword)
  }
}
