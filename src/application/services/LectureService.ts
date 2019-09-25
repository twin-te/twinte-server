import { LectureRepository } from '../repositories/lectureRepository'
import { Lecture } from '../../domain/entities/lecture'
import { inject, injectable } from 'inversify'
import { TYPES } from '../../inversifyTypes'

@injectable()
export class LectureService {
  @inject(TYPES.LectureRepository) lectureRepository!: LectureRepository

  searchByName(q: string, year: number): Promise<Lecture[]> {
    return this.lectureRepository.searchByName(q, year)
  }

  findByLectureID(lectureID: string, year: number): Promise<Lecture | null> {
    return this.lectureRepository.findByLectureID(lectureID, year)
  }
}
