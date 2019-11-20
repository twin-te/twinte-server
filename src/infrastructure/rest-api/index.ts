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
  applyPassport(app)

  const routingFolder = path.resolve(__dirname, './routing')
  const files = await fs.readdir(routingFolder)
  const services = (
    await Promise.all(
      files.map(file => import(path.resolve(routingFolder, file).split('.')[0]))
    )
  ).map(obj => obj[Object.keys(obj)[0]])

  Server.buildServices(app, ...services)

  enableSwaggerDocument(app)

  app.listen(3000, function() {
    console.log('Rest Server listening on port 3000!')
  })
}
