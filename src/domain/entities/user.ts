import { Day, Module } from 'twinte-parser'

export interface UserData {
  year: number
  lectureID: string

  memo: string
  attendance: number
  absence: number
  late: number
}

export interface Period {
  year: number
  module: Module

  day: Day
  period: number
  room: string

  lectureID: string
  name: string
  instructor: string
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

  timetables: Period[]
  userData: UserData[]
}
