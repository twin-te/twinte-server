import { Lecture } from '../domain/lecture'

/**
 * Twinteの講義データベースを更新する
 */
export interface UpdateLectureDatabaseUseCase {
  updateLectureDatabase(year: number): Promise<Lecture[]>
}
