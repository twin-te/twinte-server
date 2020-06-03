import { Moment } from 'moment-timezone'
import { SubstituteDay } from '../entity/substituteDay'
import { ModuleTerm } from '../entity/moduleTerm'
import { Module } from 'twinte-parser'
import { Event } from '../entity/event'

export interface GetSchoolCalenderUseCase {
  getSchoolEvents(year: number): Promise<Event[]>
  getSchoolEvent(date: Moment): Promise<Event | undefined>

  getSubstituteDays(year: number): Promise<SubstituteDay[]>
  getSubstituteDay(date: Moment): Promise<SubstituteDay | undefined>

  getModuleTerms(year: number): Promise<ModuleTerm[]>
  getModuleTerm(year: number, module: Module): Promise<ModuleTerm | undefined>
  getModule(date: Moment): Promise<Module | undefined>
}
