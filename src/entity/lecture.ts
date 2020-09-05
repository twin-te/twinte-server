import { Day, Module } from 'twinte-parser'

export interface LectureEntity {
  lectureCode: string
  name: string
  credits: number
  overview: string
  remarks: string
  type: number
  details: {
    module: Module
    day: Day
    period: number
    room: string
  }[]
  instructor: string
  twinte_lecture_id: string
  year: number
  standardYear: number[]
  formats: LectureFormat[]
}

export enum LectureFormat {
  OnlineAsynchronous = 'Asynchronous',
  OnlineSynchronous = 'Synchronous',
  FaceToFace = 'FaceToFace',
  Others = 'Others'
}
