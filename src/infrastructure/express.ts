import express from 'express'
import lectureController from '../interfaces/controllers/lectureController'

export default function() {
  const app = express()

  app.use('/lectures', lectureController)

  app.listen(3000, () => console.log('listening on port 3000!'))
}
