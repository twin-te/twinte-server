import { Module } from 'twinte-parser'
import { ModuleTerm } from '../../entity/moduleTerm'
import { TransferDate } from '../../entity/transferDate'

export interface SchoolCalenderRepository {
  getModuleTerm(year: number, module: Module): Promise<ModuleTerm | undefined>
  getTransferDates(year: number): Promise<TransferDate[]>
}
