import { Day, Module } from 'twinte-parser'

export interface Period {
  name: string
  year: number
  module: Module
  day: Day
  period: number
  room: string
  user_lecture_id: string
}

export interface UserLecture {
  twinte_lecture_id?: string
  user_lecture_id: string
  attendance: number
  absence: number
  late: number
  memo: string
  lecture_name: string
  instructor: string
}
