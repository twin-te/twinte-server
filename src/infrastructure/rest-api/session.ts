import session from 'express-session'
import express from 'express'
import pg from 'pg'
import pgSession from 'connect-pg-simple'

const pgStore = pgSession(session)

export function enableSession(app: express.Application) {
  app.set('trust proxy', 1)
  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'twinte',
      saveUninitialized: false,
      proxy: true,
      cookie: {
        maxAge: 31536000000,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'none'
      },
      store: new pgStore({
        pool: new pg.Pool({
          host: process.env.PG_HOST,
          port: Number(process.env.PG_PORT),
          user: process.env.PG_USER,
          password: process.env.PG_PASSWORD,
          database: process.env.PG_DATABASE
        }),
        tableName: 'session'
      }),
      resave: false
    })
  )
}
