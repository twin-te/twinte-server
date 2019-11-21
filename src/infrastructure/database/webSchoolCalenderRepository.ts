import { SchoolCalenderRepository } from '../../interface/repository/schoolCalenderRepository'
import { TransferDate } from '../../entity/transferDate'
import { ModuleTerm } from '../../entity/moduleTerm'
import { Day, Module } from 'twinte-parser'
import axios from 'axios'
import moment from 'moment'
import { injectable } from 'inversify'

@injectable()
export class WebSchoolCalenderRepository implements SchoolCalenderRepository {
  async getModuleTerm(
    year: number,
    module: Module
  ): Promise<ModuleTerm | undefined> {
    const data: { [key: number]: ModuleTerm[] } = {
      2019: [
        {
          module: Module.SpringA,
          start: moment('2019-4-1', 'YYYY-MM-DD'),
          end: moment('2019-5-30', 'YYYY-MM-DD')
        },
        {
          module: Module.SpringB,
          start: moment('2019-5-1', 'YYYY-MM-DD'),
          end: moment('2019-6-30', 'YYYY-MM-DD')
        },
        {
          module: Module.SpringC,
          start: moment('2019-7-1', 'YYYY-MM-DD'),
          end: moment('2019-8-8', 'YYYY-MM-DD')
        },
        {
          module: Module.FallA,
          start: moment('2019-10-1', 'YYYY-MM-DD'),
          end: moment('2019-11-11', 'YYYY-MM-DD')
        },
        {
          module: Module.FallB,
          start: moment('2019-11-12', 'YYYY-MM-DD'),
          end: moment('2019-12-31', 'YYYY-MM-DD')
        },
        {
          module: Module.FallC,
          start: moment('2020-1-1', 'YYYY-MM-DD'),
          end: moment('2020-2-13', 'YYYY-MM-DD')
        }
      ]
    }
    return data[year].find(el => el.module === module)
  }

  async getTransferDates(year: number): Promise<TransferDate[]> {
    const { data } = await axios.get<string>(
      'https://www.tsukuba.ac.jp/campuslife/calendar/'
    )
    return Array.from(
      data.matchAll(/(\d|\d\d)月(\d|\d\d)日は振替え授業日とし、(.)曜日の授業/g)
    ).map((el: any) => ({
      date: moment(`2019-${el[1]}-${el[2]}`, 'YYYY-MM-DD'),
      day: el[3] as Day
    }))
  }
}
