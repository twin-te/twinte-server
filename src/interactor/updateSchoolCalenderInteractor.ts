import { inject, injectable } from 'inversify'
import { SchoolCalenderRepository } from '../interface/repository/schoolCalenderRepository'
import { types } from '../di/types'
import { ModuleTerm } from '../entity/moduleTerm'
import { SubstituteDay } from '../entity/substituteDay'
import { Event } from '../entity/event'

@injectable()
export class UpdateSchoolCalenderInteractor
  implements UpdateSchoolCalenderInteractor {
  @inject(types.SchoolCalenderRepository)
  schoolCalenderRepository!: SchoolCalenderRepository

  setEvent(event: Event): Promise<Event> {
    return this.schoolCalenderRepository.setEvent(event)
  }

  setModuleTerm(term: ModuleTerm): Promise<ModuleTerm> {
    return this.schoolCalenderRepository.setModuleTerm(term)
  }

  setSubstituteDay(substituteDay: SubstituteDay): Promise<SubstituteDay> {
    return this.schoolCalenderRepository.setSubstituteDay(substituteDay)
  }
}
