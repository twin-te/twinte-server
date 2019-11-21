import express from 'express'
import { Server } from 'typescript-rest'
import { enableSwaggerDocument } from './swagger'
import { applyPassport } from './passport'
import { promises as fs } from 'fs'
import path from 'path'
import { enableSession } from './session'
import { enableCors } from './cors'

export async function startExpress() {
  console.log('start')
  let app: express.Application = express()

  enableCors(app)
  enableSession(app)
  applyPassport()

  const apiv1 = express.Router()

  const routingFolder = path.resolve(__dirname, './routing')
  const files = await fs.readdir(routingFolder)
  Server.loadServices(apiv1, 'src/infrastructure/rest-api/routing/*')

  enableSwaggerDocument(app)
  app.use('/v1', apiv1)
  app.listen(3000, function() {
    console.log('Rest Server listening on port 3000!')
  })
}
