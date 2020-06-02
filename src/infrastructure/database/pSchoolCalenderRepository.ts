import { SchoolCalenderRepository } from '../../interface/repository/schoolCalenderRepository'
import { injectable } from 'inversify'
import { ModuleTerm } from '../../entity/moduleTerm'
import { SubstituteDay } from '../../entity/substituteDay'
import { Raw, Repository } from 'typeorm'
import { ModuleTerm as pModuleTerm } from './orm/moduleTerm'
import { SchoolEvent as pSchoolEvent } from './orm/schoolEvent'
import { SubstituteDay as pSubstituteDay } from './orm/substituteDay'
import { Event } from '../../entity/event'
import { getConnection } from './index'

import moment from 'moment-timezone'
import { Module } from 'twinte-parser'
@injectable()
export class PSchoolCalenderRepository implements SchoolCalenderRepository {
  moduleTermRepository: Repository<pModuleTerm>
  schoolEventRepository: Repository<pSchoolEvent>
  substituteDayRepository: Repository<pSubstituteDay>

  constructor() {
    this.moduleTermRepository = getConnection().getRepository(pModuleTerm)
    this.schoolEventRepository = getConnection().getRepository(pSchoolEvent)
    this.substituteDayRepository = getConnection().getRepository(pSubstituteDay)
  }

  async getEvents(year: number): Promise<Event[]> {
    const res = await this.schoolEventRepository.find({
      date: Raw(
        alias =>
          `${alias} >= '${year}-01-01'::date and ${alias} <= '${year +
            1}-12-31'::date`
      )
    })
    return res.map(el => ({
      date: moment(el.date),
      description: el.description,
      event_type: el.event_type,
      metadata: el.metadata
    }))
  }

  async getModuleTerms(year: number): Promise<ModuleTerm[]> {
    const res = await this.moduleTermRepository.find({ year })
    return res.map(el => ({
      year: el.year,
      module: el.module,
      start: moment(el.start),
      end: moment(el.end)
    }))
  }

  async getSubstituteDays(year: number): Promise<SubstituteDay[]> {
    const res = await this.substituteDayRepository.find({
      date: Raw(
        alias =>
          `${alias} >= '${year}-04-01'::date and ${alias} <= '${year +
            1}-03-31'::date`
      )
    })
    return res.map(el => ({
      date: moment(el.date),
      change_to: el.change_to
    }))
  }

  async setEvent(event: Event): Promise<Event> {
    const newEvent = new pSchoolEvent()
    newEvent.date = event.date.format('YYYY-MM-DD')
    newEvent.event_type = event.event_type
    newEvent.metadata = event.metadata
    newEvent.description = event.description
    const res = await this.schoolEventRepository.save(newEvent)
    return {
      date: moment(res.date),
      description: res.description,
      event_type: res.event_type,
      metadata: res.metadata
    }
  }

  async setModuleTerm(term: ModuleTerm): Promise<ModuleTerm> {
    let target = await this.moduleTermRepository.findOne({
      year: term.year,
      module: term.module
    })
    if (!target) target = new pModuleTerm()

    target.module = term.module
    target.start = term.start.format('YYYY-MM-DD')
    target.end = term.end.format('YYYY-MM-DD')
    target.year = term.year
    const res = await this.moduleTermRepository.save(target)
    return {
      year: res.year,
      module: res.module,
      start: moment(res.start),
      end: moment(res.end)
    }
  }

  async setSubstituteDay(substituteDay: SubstituteDay): Promise<SubstituteDay> {
    const newSub = new pSubstituteDay()
    newSub.date = substituteDay.date.format('YYYY-MM-DD')
    newSub.change_to = substituteDay.change_to
    const res = await this.substituteDayRepository.save(newSub)
    return {
      date: moment(res.date),
      change_to: res.change_to
    }
  }

  async getEvent(date: moment.Moment): Promise<Event | undefined> {
    const res = await this.schoolEventRepository.findOne({
      date: Raw(
        alias =>
          `${alias} = '${date.year()}-${date.month() + 1}-${date.date()}'::date`
      )
    })
    if (!res) return undefined
    return {
      date: moment(res.date),
      description: res.description,
      event_type: res.event_type,
      metadata: res.metadata
    }
  }

  async getModuleTerm(
    year: number,
    module: Module
  ): Promise<ModuleTerm | undefined> {
    const res = await this.moduleTermRepository.findOne({ year, module })
    if (!res) return undefined
    return {
      year: res.year,
      module: res.module,
      start: moment(res.start),
      end: moment(res.end)
    }
  }

  async getSubstituteDay(
    date: moment.Moment
  ): Promise<SubstituteDay | undefined> {
    const res = await this.substituteDayRepository.findOne({
      date: Raw(
        alias =>
          `${alias} = '${date.year()}-${date.month() + 1}-${date.date()}'::date`
      )
    })
    if (!res) return undefined
    return {
      date: moment(res.date),
      change_to: res.change_to
    }
  }
}
