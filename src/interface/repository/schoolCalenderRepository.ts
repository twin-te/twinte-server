import { ModuleTerm } from '../../entity/moduleTerm'
import { SubstituteDay } from '../../entity/substituteDay'
import { Event } from '../../entity/event'
import { Module } from 'twinte-parser'
import { Moment } from 'moment'

export interface SchoolCalenderRepository {
  getModuleTerms(year: number): Promise<ModuleTerm[]>
  getModuleTerm(year: number, module: Module): Promise<ModuleTerm | undefined>
  getSubstituteDays(year: number): Promise<SubstituteDay[]>
  getSubstituteDay(date: Moment): Promise<SubstituteDay | undefined>
  getEvents(year: number): Promise<Event[]>
  getEvent(date: Moment): Promise<Event | undefined>

  setModuleTerm(term: ModuleTerm): Promise<ModuleTerm>
  setSubstituteDay(substituteDay: SubstituteDay): Promise<SubstituteDay>
  setEvent(event: Event): Promise<Event>
}
