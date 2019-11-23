import log4js from 'log4js'
import envCheck from '../envCheck'
import container from '../di/inversify.config'
import { types } from '../di/types'
import { UpdateSchoolCalenderUseCase } from '../usecase/UpdateSchoolCalenderUseCase'
import { promises as fs } from 'fs'
import { connect } from '../infrastructure/database'

import moment from 'moment'
import { SubstituteDay } from '../entity/substituteDay'
log4js.configure('./dev-log4js-config.json')
const logger = log4js.getLogger('main')

envCheck(['Database'])

if (!process.argv[2]) {
  logger.fatal('引数に読み込む定義jsonファイルを指定してください')
}

const main = async () => {
  await connect()
  logger.info(`振替授業の定義を ${process.argv[2]}から読み込んでいます...`)
  const usecase = container.get<UpdateSchoolCalenderUseCase>(
    types.UpdateSchoolCalenderUseCase
  )
  const json: string = (await fs.readFile(process.argv[2], 'UTF-8')) as string
  const substituteDays: SubstituteDay[] = JSON.parse(json)
  const res = await Promise.all(
    substituteDays.map(m =>
      usecase.setSubstituteDay({
        date: moment(m.date),
        change_to: m.change_to
      })
    )
  )
  logger.debug(res)
  logger.info(`書き込みが完了しました`)
}

main()
