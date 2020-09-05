import log4js from 'log4js'
import envCheck from '../envCheck'
import container, {configureDiContainer} from '../di/inversify.config'
import { types } from '../di/types'
import { UpdateSchoolCalenderUseCase } from '../usecase/updateSchoolCalenderUseCase'
import { promises as fs } from 'fs'
import { connect } from '../infrastructure/database'

import moment from 'moment-timezone'
import { Event } from '../entity/event'
log4js.configure('./dev-log4js-config.json')
const logger = log4js.getLogger('main')

envCheck(['Database'])

if (!process.argv[2]) {
  logger.fatal('引数に読み込む定義jsonファイルを指定してください')
}

const main = async () => {
  configureDiContainer()
  await connect()
  logger.info(`イベントの定義を ${process.argv[2]}から読み込んでいます...`)
  const usecase = container.get<UpdateSchoolCalenderUseCase>(
    types.UpdateSchoolCalenderUseCase
  )
  const json: string = (await fs.readFile(process.argv[2], 'UTF-8')) as string
  const substituteDays: Event[] = JSON.parse(json)
  const res = await Promise.all(
    substituteDays.map(m =>
      usecase.setEvent({
        date: moment(m.date),
        description: m.description,
        event_type: m.event_type,
        metadata: m.metadata || {}
      })
    )
  )
  logger.debug(res)
  logger.info(`書き込みが完了しました`)
}

main()
