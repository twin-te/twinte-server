import express from 'express'
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
export function enableCors(app: express.Application) {
  app.use(
    process.env.NODE_ENV !== 'production'
      ? devCorsMiddleware
      : prodCorsMiddleware
  )
}
