import {LectureRepository} from "./lectureRepository"
import {Lecture} from "../../domain/lecture"

export class PostgresLectureRepositor implements LectureRepository {
  findLectureById(twinteLectureId: string): Lecture {

  }

  upsertLectures(lectures: Lecture[]): Lecture {

  }

}
