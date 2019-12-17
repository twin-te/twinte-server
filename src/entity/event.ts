import { Moment } from 'moment'

export enum EventType {
  Holiday = '休日',
  PublicHoliday = '祝日',
  Exam = '試験',
  SubstituteDay = '振替授業日'
}

export interface Event {
  date: Moment
  description: string
  event_type: EventType
  metadata?: {}
}
