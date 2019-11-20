import express from 'express'
import { Server } from 'typescript-rest'
import { enableSwaggerDocument } from './swagger'
import { applyPassport } from './passport'
import session from 'express-session'
import { promises as fs } from 'fs'
import path from 'path'
import cors from 'cors'

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
  origin: [
    'https://twinte.net',
    'https://dev.twinte.net',
    'https://twins.tsukuba.ac.jp'
  ],
  credentials: true
})

export async function startExpress() {
  console.log('start')
  let app: express.Application = express()
  app.use(
    process.env.NODE_ENV !== 'production'
      ? devCorsMiddleware
      : prodCorsMiddleware
  )
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
