import { User } from '../entity/user'
import { Day, Module } from 'twinte-parser'
import {Period} from '../entity/period'

export interface GetTimetableUseCase {
  getTimetable(
    user: User,
    year?: number,
    module?: Module,
    day?: Day
  ): Promise<Period[]>
}
