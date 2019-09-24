import { Lecture } from '../../domain/entities/lecture'

export interface LectureRepository {
  updateAll(lectures: Lecture[], year: number): Promise<void>
  searchByName(q: string, year: number): Promise<Lecture[]>
  findByLectureID(lectureID: string, year: number): Promise<Lecture | null>
  isEmpty(year: number): Promise<boolean>
}
