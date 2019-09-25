import { LectureRepository } from '../repositories/lectureRepository'
import { KdbRepository } from '../repositories/kdbRepository'
import { injectable, inject } from 'inversify'
import { TYPES } from '../../inversifyTypes'

@injectable()
export class KdbService {
  @inject(TYPES.LectureRepository) private lectureRepository!: LectureRepository
  @inject(TYPES.KdbRepository) private kdbRepository!: KdbRepository

  async updateLocalKdbDatabase(year: number, onlyIsEmpty?: boolean) {
    if (
      !onlyIsEmpty ||
      (onlyIsEmpty && (await this.lectureRepository.isEmpty(year)))
    ) {
      const lectures = await this.kdbRepository.getAllLecturesFromRemoteServer(
        year
      )
      await this.lectureRepository.updateAll(lectures)
    }
  }
}
