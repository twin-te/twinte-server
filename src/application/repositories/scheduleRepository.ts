import { Day, Module } from 'twinte-parser'
import moment from 'moment';

export interface TransferDate {
  date: moment.Moment
  transferDay: Day
}

export interface ScheduleRepository {
  getTransferDays(): Promise<TransferDate[]>
  getModuleSchedule(): Promise<{
    module: Module,
    start: moment.Moment,
    end: moment.Moment
  }[]>
}