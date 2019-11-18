import express from 'express'
import { Server } from 'typescript-rest'
import { LectureService } from './routing/lectureService'
import { enableSwaggerDocument } from './swagger'

export function startExpress() {
  let app: express.Application = express()
  Server.buildServices(app, LectureService)

  enableSwaggerDocument(app)

  app.listen(3000, function() {
    console.log('Rest Server listening on port 3000!')
  })
}
