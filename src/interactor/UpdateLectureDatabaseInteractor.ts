import { inject, injectable } from 'inversify'
import { types } from '../di/types'
import { LectureRepository } from '../interface/repository/lectureRepository'
import { UpdateLectureDatabaseUseCase } from '../usecase/UpdateLectureDatabaseUseCase'
import { LectureEntity } from '../entity/lecture'
import { RemoteLectureRepository } from '../interface/repository/remoteLectureRepository'

@injectable()
/**
 * Twinteの講義データベースを更新する
 */
export class UpdateLectureDatabaseInteractor
  implements UpdateLectureDatabaseUseCase {
  @inject(types.LectureRepository) private lectureRepository!: LectureRepository
  @inject(types.RemoteLectureRepository)
  private remoteLectureRepository!: RemoteLectureRepository

  async updateLectureDatabase(year: number): Promise<LectureEntity[]> {
    const remoteLectures = await this.remoteLectureRepository.fetchRemoteDatabase(
      year
    )
    return this.lectureRepository.upsertLectures(remoteLectures)
  }
}
