import express from 'express'
import authController from '../interfaces/controllers/authController'
import lectureController from '../interfaces/controllers/lectureController'
import timetableController from '../interfaces/controllers/timetableController'
import userDataController from '../interfaces/controllers/userDataController'

import bodyParser from 'body-parser'
export default function() {
  const app = express()
  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  )
  app.use(bodyParser.json())
  authController(app)
  app.use('/lectures', lectureController)
  app.use('/timetables', timetableController)
  app.use('/userdata', userDataController)
  app.get('/', (req, res) => res.json(req.user))

  app.listen(3000, () => console.log('listening on port 3000!'))
}
