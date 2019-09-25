import express from 'express'
import cors from 'cors'
import initSwagger from '../swagger'
import applyAuthController from '../interfaces/controllers/authController'
import lectureController from '../interfaces/controllers/lectureController'
import timetableController from '../interfaces/controllers/timetableController'
import userDataController from '../interfaces/controllers/userDataController'
import userController from '../interfaces/controllers/userController'
import bodyParser from 'body-parser'

// 開発中用cors設定
const devCorsMiddleware = (
  req: express.Request,
  res: express.Response,
  next: () => void
) => {
  /* originをオウム返し
     Credentialsがtrueの時、ワイルドカードが使えない  */
  res.header(
    'Access-Control-Allow-Origin',
    req.headers.origin ? req.headers.origin.toString() : ''
  )
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header(
    'Access-Control-Allow-Methods',
    'GET,POST,PUT,PATCH,DELETE,HEAD,OPTIONS'
  )
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') {
    res.sendStatus(200)
    return
  }
  next()
}

// プロダクション用cors設定
const prodCorsMiddleware = cors({
  origin: 'https://twinte.net',
  credentials: true
})

// express 初期化
export default function() {
  const app = express()
  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  )
  app.use(bodyParser.json())

  app.use(
    process.env.NODE_ENV !== 'production'
      ? devCorsMiddleware
      : prodCorsMiddleware
  )

  applyAuthController(app)
  app.use('/lectures', lectureController)
  app.use('/timetables', timetableController)
  app.use('/userdatas', userDataController)
  app.use('/users', userController)
  app.get('/', (req, res) => res.json(req.user))

  if (process.env.NODE_ENV !== 'production') initSwagger(app)

  app.listen(3000, () => console.log('listening on port 3000!'))
}
