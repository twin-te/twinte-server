import express from 'express'
import { Server } from 'typescript-rest'
import { enableSwaggerDocument } from './swagger'
import { applyPassport } from './passport'
import { enableSession } from './session'
import { enableCors } from './cors'
import log4js, { getLogger } from 'log4js'

const logger = getLogger('express')

export async function startExpress() {
  let app: express.Application = express()
  app.use(
    log4js.connectLogger(logger, {
      level: 'info',
      format: (req, _, formatter) =>
        formatter(
          `:remote-addr - ${
            req.user ? req.user.twinte_user_id : 'not logged in'
          } - ":method :url HTTP/:http-version" :status :content-length ":referrer" ":user-agent"`
        )
    })
  )

  enableCors(app)
  enableSession(app)
  applyPassport()

  const apiv1 = express.Router()

  Server.loadServices(apiv1, './routing/*', __dirname)

  enableSwaggerDocument(app)
  app.use('/v1', apiv1)
  app.listen(process.env.PORT, () => {
    logger.info(`準備完了 ${process.env.BASE_URL}`)
  })
}
