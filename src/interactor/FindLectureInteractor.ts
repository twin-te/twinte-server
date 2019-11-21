import { inject, injectable } from 'inversify'
import { FindLectureUseCase } from '../usecase/FindLectureUseCase'
import { LectureEntity } from '../entity/lecture'
import { types } from '../di/types'
import { LectureRepository } from '../interface/repository/lectureRepository'

@injectable()
export class FindLectureInteractor
  implements FindLectureUseCase {
  @inject(types.LectureRepository) private lectureRepository!: LectureRepository
  async searchLectureByKeyword(keyword: string): Promise<LectureEntity[]> {
    return this.lectureRepository.searchLectureByKeyword(keyword)
  }

  findLectureByLectureID(twinte_lecture_id: string): Promise<LectureEntity | undefined> {
    return  this.lectureRepository.findLectureById(twinte_lecture_id)
  }
}
