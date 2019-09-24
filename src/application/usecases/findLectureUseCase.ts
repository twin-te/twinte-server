import { LectureRepository } from '../repositories/lectureRepository'
import { Lecture } from '../../domain/entities/lecture'
import { inject, injectable } from 'inversify'
import { TYPES } from '../../types'

@injectable()
export class FindLectureUseCase {
  @inject(TYPES.LectureRepository) lectureRepository!: LectureRepository

  searchByName(q: string, year: number): Promise<Lecture[]> {
    return this.lectureRepository.searchByName(q, year)
  }

  findByLectureID(lectureID: string, year: number): Promise<Lecture | null> {
    return this.lectureRepository.findByLectureID(lectureID, year)
  }
}
