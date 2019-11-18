import {Lecture} from "../domain/lecture"
import {inject, injectable} from "inversify"
import {LectureRepository} from "../interface/repository/lectureRepository"
import {types} from "../di/types"

@injectable()
export class UpsertLectureDataUseCase {
  @inject(types.LectureRepository) lectureRepository!: LectureRepository
  upsert(lectures: Lecture[]) {
    this.lectureRepository.upsertLectures(lectures)
  }
}
