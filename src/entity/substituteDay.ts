import { Moment } from 'moment-timezone'
import { Day } from 'twinte-parser'

export interface SubstituteDay {
  date: Moment
  change_to: Day
}
