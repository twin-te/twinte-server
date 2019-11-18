import {Lecture} from "../../domain/lecture"

export interface LectureRepository {
  findLectureById(twinteLectureId: string): Lecture
  upsertLectures(lectures: Lecture[]): Lecture
}
