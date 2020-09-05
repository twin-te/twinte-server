import { Day, Module } from 'twinte-parser'
import { LectureFormat } from './lecture'

export interface PeriodEntity {
  year: number
  module: Module
  day: Day
  period: number
  room: string
  user_lecture_id: string
}

export interface UserLectureEntity {
  twinte_lecture_id: string | null
  user_lecture_id: string
  year: number
  attendance: number
  absence: number
  late: number
  memo: string
  lecture_name: string
  instructor: string
  credits: number
  formats: LectureFormat[]
}

export interface TimetableEntity extends PeriodEntity {
  lecture_name: string
  lecture_code?: string
  instructor: string
  formats: LectureFormat[]
}
