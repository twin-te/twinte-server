import { Express } from 'express'
import session from 'express-session'
import passport from 'passport'
import { Strategy as TwitterStrategy } from 'passport-twitter'
import container from '../../inversify.config'
import { TYPES } from '../../inversifyTypes'
import { UserService } from '../../application/services/UserService'
import { User } from '../../domain/entities/user'

import _MongoStore from 'connect-mongo'
const userService = container.get<UserService>(TYPES.UserService)

export default function(app: Express) {
  const MongoStore = _MongoStore(session)
  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'twinte',
      saveUninitialized: false,
      store: new MongoStore({
        url: process.env.MONGO_URL || 'mongodb://localhost/twinte'
      })
    })
  )
  app.use(passport.initialize())
  app.use(passport.session())
  passport.serializeUser<string, string>((id, done) => {
    done(null, id)
  })
  passport.deserializeUser<User, string>(async (id, done) => {
    const user = await userService.findByTwitterID(id)
    if (user) done(null, user)
    else done('error')
  })
  passport.use(
    new TwitterStrategy(
      {
        consumerKey: process.env.TWITTER_CONSUMER_KEY || '',
        consumerSecret: process.env.TWITTER_CONSUMER_SECRET || '',
        callbackURL: 'http://localhost:3000/twitter-callback'
      },
      async (_, __, profile, cb) => {
        if (!(await userService.findByTwitterID(profile.id))) {
          await userService.createUserByTwitter({
            provider: profile.provider,
            id: profile.id,
            displayName: profile.displayName,
            username: profile.username,
            photos: profile.photos
          })
        }
        cb(null, profile.id)
      }
    )
  )
  app.get('/login', passport.authenticate('twitter'))
  app.get(
    '/twitter-callback',
    passport.authenticate('twitter', { failureRedirect: '/login' }),
    (_, res) => {
      res.redirect('/')
    }
  )
}
