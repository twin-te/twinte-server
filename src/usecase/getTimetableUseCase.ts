import { UserEntity } from '../entity/user'
import { Day, Module } from 'twinte-parser'
import {PeriodEntity} from '../entity/period'

export interface GetTimetableUseCase {
  getTimetable(
    user: UserEntity,
    year?: number,
    module?: Module,
    day?: Day
  ): Promise<PeriodEntity[]>
}
