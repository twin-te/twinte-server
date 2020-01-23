import { clearDatabase, initRepository } from '../helper'
import { SchoolCalenderRepository } from '../../src/interface/repository/schoolCalenderRepository'
import { types } from '../../src/di/types'
import { Day, Module } from 'twinte-parser'
import moment from 'moment'
import { ModuleTerm } from '../../src/entity/moduleTerm'
import { SubstituteDay } from '../../src/entity/substituteDay'
import { Event, EventType } from '../../src/entity/event'
import container, { configureDiContainer } from '../../src/di/inversify.config'

let schoolCalenderRepository: SchoolCalenderRepository

beforeAll(async () => {
  await initRepository()
  configureDiContainer([types.SchoolCalenderRepository])
  schoolCalenderRepository = container.get(types.SchoolCalenderRepository)
})

describe('ModuleTerms', () => {
  const testModuleTerms: ModuleTerm[] = [
    {
      year: 2019,
      module: Module.SpringA,
      start: moment('2019-04-01'),
      end: moment('2019-05-23')
    },
    {
      year: 2019,
      module: Module.SpringB,
      start: moment('2019-05-24'),
      end: moment('2019-07-04')
    }
  ]
  test('SetModuleTerm', async () => {
    await Promise.all(
      testModuleTerms.map(async (m, i) => {
        const res = await schoolCalenderRepository.setModuleTerm(m)
        expect(res).toMatchObject(testModuleTerms[i])
      })
    )
  })

  test('GetModuleTerm', async () => {
    const res = await schoolCalenderRepository.getModuleTerm(
      testModuleTerms[0].year,
      testModuleTerms[0].module
    )
    expect(res).toMatchObject(testModuleTerms[0])
  })

  test('GetModuleTerms', async () => {
    const res = await schoolCalenderRepository.getModuleTerms(2019)
    expect(res).toEqual(expect.arrayContaining(testModuleTerms))
  })
})

describe('SubstituteDay', () => {
  const testSubstituteDays: SubstituteDay[] = [
    {
      date: moment('2019-05-09'),
      change_to: Day.Mon
    },
    {
      date: moment('2019-07-19'),
      change_to: Day.Mon
    }
  ]

  test('setSubstituteDay', async () => {
    await Promise.all(
      testSubstituteDays.map(async s => {
        const res = await schoolCalenderRepository.setSubstituteDay(s)
        expect(res).toMatchObject(s)
      })
    )
  })

  test('GetSubstituteDay', async () => {
    await Promise.all(
      testSubstituteDays.map(async s => {
        const res = await schoolCalenderRepository.getSubstituteDay(s.date)
        expect(res).toMatchObject(s)
      })
    )
  })

  test('GetSubstituteDays', async () => {
    const res = await schoolCalenderRepository.getSubstituteDays(2019)
    expect(res).toEqual(expect.arrayContaining(testSubstituteDays))
  })
})

describe('Events', () => {
  const testEvents: Event[] = [
    {
      date: moment('2019-11-27'),
      event_type: EventType.Holiday,
      description: '推薦入試',
      metadata: {}
    },
    {
      date: moment('2019-11-28'),
      event_type: EventType.Holiday,
      description: '推薦入試',
      metadata: {}
    }
  ]
  test('SetEvent', async () => {
    await Promise.all(
      testEvents.map(async e => {
        const res = await schoolCalenderRepository.setEvent(e)
        expect(res).toMatchObject(e)
      })
    )
  })
  test('GetEvent', async () => {
    await Promise.all(
      testEvents.map(async e => {
        const res = await schoolCalenderRepository.getEvent(e.date)
        expect(res).toMatchObject(e)
      })
    )
  })
  test('GetEvents', async () => {
    const res = await schoolCalenderRepository.getEvents(2019)
    expect(res).toEqual(expect.arrayContaining(testEvents))
  })
})

afterAll(() => clearDatabase())
