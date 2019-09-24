import initExpress from './infrastructure/express'
import mongoConnection from './infrastructure/mongoConnection'
;(async () => {
  await mongoConnection()
  initExpress()
})()
