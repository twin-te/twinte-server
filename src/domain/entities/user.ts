import { Module } from 'twinte-parser'
import { Lecture } from './lecture'

export interface UserLectureData {
  lecture: Lecture
  memo: string
  attendance: number
  absence: number
  late: number
}

export interface User {
  twitter: {
    id: number
    displayName: string
    username: string
    photos?: {
      value: string
    }[]
  }
  timetables: {
    year: number
    module: Module
    lectures: UserLectureData[]
  }[]
}
