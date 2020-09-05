import express from 'express'
import cors from 'cors'

// 開発中用cors設定
const devCorsMiddleware = cors({
  origin: /.*/,
  credentials: true
})

// プロダクション用cors設定
const prodCorsMiddleware = cors({
  origin: [
    /https:\/\/(.+\.)*twinte\.net$/,
    'https://twins.tsukuba.ac.jp',
    /localhost(:\d{1,5})?$/
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
