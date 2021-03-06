import { connect } from './infrastructure/database'
import envCheck from './envCheck'
import log4js from 'log4js'
import moment from 'moment-timezone'
import 'moment/locale/ja'
import { initStripe } from './infrastructure/payment/stripe'
import 'moment-timezone'

if (process.env.NODE_ENV === 'production')
  log4js.configure('./prod-log4js-config.json')
else log4js.configure('./dev-log4js-config.json')

const logger = log4js.getLogger('main')

if (process.env.NODE_ENV === 'production')
  logger.info('プロダクションモードで起動します')
else logger.info('開発モードで起動します')

envCheck()

moment.locale('ja')
moment.tz.setDefault('Asia/Tokyo')

const main = async () => {
  logger.info('起動開始')
  await connect()
  initStripe()
  const { configureDiContainer } = await import('./di/inversify.config')
  configureDiContainer()
  const { startExpress } = await import('./infrastructure/rest-api')
  await startExpress()
}
main()
