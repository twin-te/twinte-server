import { inject, injectable } from 'inversify'
import { FindLectureUseCase } from '../usecase/findLectureUseCase'
import { LectureEntity } from '../entity/lecture'
import { types } from '../di/types'
import { LectureRepository } from '../interface/repository/lectureRepository'

@injectable()
export class FindLectureInteractor implements FindLectureUseCase {
  @inject(types.LectureRepository) private lectureRepository!: LectureRepository
  async searchLectureByKeyword(
    year: number,
    keyword: string
  ): Promise<LectureEntity[]> {
    return this.lectureRepository.searchLectureByKeyword(year, keyword)
  }

  findLectureByLectureID(
    twinte_lecture_id: string
  ): Promise<LectureEntity | undefined> {
    return this.lectureRepository.findLectureById(twinte_lecture_id)
  }
}
