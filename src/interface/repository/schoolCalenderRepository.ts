import { ModuleTerm } from '../../entity/moduleTerm'
import { SubstituteDay } from '../../entity/substituteDay'
import { Event } from '../../entity/event'

export interface SchoolCalenderRepository {
  getModuleTerms(year: number): Promise<ModuleTerm[]>
  getSubstituteDays(year: number): Promise<SubstituteDay[]>
  getEvents(year: number): Promise<Event[]>

  setModuleTerm(term: ModuleTerm): Promise<ModuleTerm>
  setSubstituteDay(substituteDay: SubstituteDay): Promise<SubstituteDay>
  setEvent(event: Event): Promise<Event>
}
