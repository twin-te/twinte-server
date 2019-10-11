import initExpress from './infrastructure/express'
import mongoConnection from './infrastructure/mongoConnection'
import container from './inversify.config'
import { KdbService } from './application/services/KdbService'
import { TYPES } from './inversifyTypes'
import moment from 'moment'

moment.locale('ja')

;(async () => {
  await mongoConnection()
  container.get<KdbService>(TYPES.KdbService).updateLocalKdbDatabase(2019, true)
  initExpress()
})()
