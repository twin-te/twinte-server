import { GetSchoolCalenderUseCase } from '../usecase/getSchoolCalenderUseCase'
import { Module } from 'twinte-parser'
import { ModuleTerm } from '../entity/moduleTerm'
import { Event } from '../entity/event'
import { SubstituteDay } from '../entity/substituteDay'
import { inject, injectable } from 'inversify'
import { types } from '../di/types'
import { Moment } from 'moment-timezone'
import { SchoolCalenderRepository } from '../interface/repository/schoolCalenderRepository'

@injectable()
export class GetSchoolCalenderInteractor implements GetSchoolCalenderUseCase {
  @inject(types.SchoolCalenderRepository)
  schoolCalenderRepository!: SchoolCalenderRepository

  getModuleTerm(year: number, module: Module): Promise<ModuleTerm | undefined> {
    return this.schoolCalenderRepository.getModuleTerm(year, module)
  }

  getModuleTerms(year: number): Promise<ModuleTerm[]> {
    return this.schoolCalenderRepository.getModuleTerms(year)
  }

  getSchoolEvent(date: Moment): Promise<Event | undefined> {
    return this.schoolCalenderRepository.getEvent(date)
  }

  getSchoolEvents(year: number): Promise<Event[]> {
    return this.schoolCalenderRepository.getEvents(year)
  }

  getSubstituteDay(date: Moment): Promise<SubstituteDay | undefined> {
    return this.schoolCalenderRepository.getSubstituteDay(date)
  }

  getSubstituteDays(year: number): Promise<SubstituteDay[]> {
    return this.schoolCalenderRepository.getSubstituteDays(year)
  }

  async getModule(date: Moment): Promise<Module | undefined> {
    const nendo = date.month() < 3 ? date.year() - 1 : date.year()

    const moduleTerms = await this.schoolCalenderRepository.getModuleTerms(
      nendo
    )
    const target = moduleTerms
      .filter(el => el)
      .find(
        el =>
          date.isBetween(el!.start, el!.end) ||
          date.isSame(el!.start) ||
          date.isSame(el!.end)
      )
    if (!target) return undefined
    else return target.module
  }
}
