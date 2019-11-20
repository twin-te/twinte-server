import { LectureEntity } from '../entity/lecture'

/**
 * Twinteの講義データベースを更新する
 */
export interface UpdateLectureDatabaseUseCase {
  updateLectureDatabase(year: number): Promise<LectureEntity[]>
}
