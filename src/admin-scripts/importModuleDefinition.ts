import log4js from 'log4js'
import envCheck from '../envCheck'
import container from '../di/inversify.config'
import { types } from '../di/types'
import { UpdateSchoolCalenderUseCase } from '../usecase/UpdateSchoolCalenderUseCase'
import { promises as fs } from 'fs'
import { ModuleTerm } from '../entity/moduleTerm'
import { connect } from '../infrastructure/database'
import moment from 'moment'
log4js.configure('./dev-log4js-config.json')
const logger = log4js.getLogger('main')

envCheck(['Database'])
if (!process.argv[2]) {
  logger.fatal('引数に読み込む定義jsonファイルを指定してください')
}
const main = async () => {
  await connect()
  logger.info(
    `モジュール期間の定義を ${process.argv[2]}から読み込んでいます...`
  )
  const usecase = container.get<UpdateSchoolCalenderUseCase>(
    types.UpdateSchoolCalenderUseCase
  )
  const json: string = (await fs.readFile(process.argv[2], 'UTF-8')) as string
  const moduleTerm: ModuleTerm[] = JSON.parse(json)
  const res = await Promise.all(
    moduleTerm.map(m =>
      usecase.setModuleTerm({
        year: m.year,
        module: m.module,
        start: moment(m.start),
        end: moment(m.end)
      })
    )
  )
  logger.debug(res)
  logger.info(`書き込みが完了しました`)
}

main()
