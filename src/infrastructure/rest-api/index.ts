import express from 'express'
import { Server } from 'typescript-rest'
import { enableSwaggerDocument } from './swagger'
import { applyPassport } from './passport'
import session from 'express-session'
import { promises as fs } from 'fs'
import path from 'path'
export async function startExpress() {
  console.log('start')
  let app: express.Application = express()
  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'twinte',
      saveUninitialized: false,
      cookie: {
        maxAge: 31536000000
      }
    })
  )
  applyPassport(app)

  const routingFolder = path.resolve(__dirname, './routing')
  const files = await fs.readdir(routingFolder)
  const services = (await Promise.all(
    files.map(file => import(path.resolve(routingFolder, file).split('.')[0]))
  )).map(obj => obj[Object.keys(obj)[0]])
  Server.buildServices(app, ...services)

  enableSwaggerDocument(app)

  app.listen(3000, function() {
    console.log('Rest Server listening on port 3000!')
  })
}
