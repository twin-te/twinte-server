import { inject, injectable } from 'inversify'
import { types } from '../../di/types'
import { EventType } from '../../entity/event'
import { GetSchoolCalenderUseCase } from '../../usecase/getSchoolCalenderUseCase'

import moment from 'moment'
import { Day, Module } from 'twinte-parser'

interface OutputEvent {
  description: string
  event_type: EventType
  metadata?: {}
  date: string
}

interface OutputSubstituteDay {
  date: string
  change_to: Day
}

export interface OutputSchoolCalender {
  event?: OutputEvent
  substituteDay?: OutputSubstituteDay
  module?: Module
}

@injectable()
export class SchoolCalenderController {
  @inject(types.GetSchoolCalenderUseCase)
  getSchoolCalenderUseCae!: GetSchoolCalenderUseCase

  async getCalender(date: string): Promise<OutputSchoolCalender> {
    let mdate
    if (date === 'today') mdate = moment()
    else mdate = moment(date)
    const event = await this.getSchoolCalenderUseCae.getSchoolEvent(mdate)
    const substituteDay = await this.getSchoolCalenderUseCae.getSubstituteDay(
      mdate
    )
    const module = await this.getSchoolCalenderUseCae.getModule(mdate)

    const outputEvent: OutputEvent | undefined = event
      ? {
          date: event.date.format('YYYY-MM-DD'),
          event_type: event.event_type,
          metadata: event.metadata,
          description: event.description
        }
      : undefined

    const outputSubstitute: OutputSubstituteDay | undefined = substituteDay
      ? {
          date: substituteDay.date.format('YYYY-MM-DD'),
          change_to: substituteDay.change_to
        }
      : undefined

    return {
      event: outputEvent,
      substituteDay: outputSubstitute,
      module
    }
  }
}
