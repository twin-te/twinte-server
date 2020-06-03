import { Moment } from 'moment-timezone'

export interface Information {
  id: string
  title: string
  content: string
  date: Moment
  tag: string
}
