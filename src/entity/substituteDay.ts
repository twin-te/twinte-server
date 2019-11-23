import { Moment } from 'moment'
import { Day } from 'twinte-parser'

export interface SubstituteDay {
  date: Moment
  change_to: Day
}
