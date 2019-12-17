/**
 * 講義データベースを最新のリモートレポジトリ(kdb)で更新する
 */

import container from '../di/inversify.config'
import { types } from '../di/types'
import { UpdateLectureDatabaseUseCase } from '../usecase/updateLectureDatabaseUseCase'
import { connect } from '../infrastructure/database'
import envCheck from '../envCheck'
import log4js from 'log4js'

log4js.configure('./dev-log4js-config.json')
const logger = log4js.getLogger('main')

envCheck(['Database'])
const main = async () => {
  await connect()
  logger.info(
    '講義データベースの更新を開始します。途中で終了しないでください。'
  )
  const usecase = container.get<UpdateLectureDatabaseUseCase>(
    types.UpdateLectureDatabaseUseCase
  )
  await usecase.updateLectureDatabase(2019)
}
main()
