import { ModuleTerm } from '../entity/moduleTerm'
import { SubstituteDay } from '../entity/substituteDay'
import { Event } from '../entity/event'

export interface UpdateSchoolCalenderUseCase {
  setModuleTerm(term: ModuleTerm): Promise<ModuleTerm>
  setSubstituteDay(substituteDay: SubstituteDay): Promise<SubstituteDay>
  setEvent(event: Event): Promise<Event>
}
