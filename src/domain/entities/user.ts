import { Day, Module } from 'twinte-parser'

export interface UserLectureData {
  year: number
  module: Module
  day: Day
  period: number
  room: string

  lectureID: string
  name: string
  instructor: string

  memo: string
  attendance: number
  absence: number
  late: number
}

interface Period {

}

export interface User {
  twitter: {
    id: string
    displayName: string
    username?: string
    photos?: {
      value: string
    }[]
  }
  timetables: UserLectureData[]
}
