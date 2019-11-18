import {Lecture as _Lecture} from "twinte-parser"

export interface Lecture extends _Lecture {
  twinte_lecture_id: string
  year: number
}
