import { Moment } from 'moment-timezone'
import { Module } from 'twinte-parser'

export interface ModuleTerm {
  year: number
  start: Moment
  end: Moment
  module: Module
}
