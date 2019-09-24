import express from 'express'
import authController from '../interfaces/controllers/authController'
import lectureController from '../interfaces/controllers/lectureController'

export default function() {
  const app = express()

  authController(app)
  app.use('/lectures', lectureController)
  app.get('/', (req, res) => res.json(req.user))

  app.listen(3000, () => console.log('listening on port 3000!'))
}
