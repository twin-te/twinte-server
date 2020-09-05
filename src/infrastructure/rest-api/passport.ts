import { Strategy as TwitterStrategy } from 'passport-twitter'
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth'
// @ts-ignore
import AppleStrategy from 'passport-apple'
import container from '../../di/inversify.config'
import { LoginUseCase } from '../../usecase/loginUseCase'
import { types } from '../../di/types'
import {
  AuthenticationProvider,
  UserAuthenticationEntity,
  UserEntity
} from '../../entity/user'
import { CreateUserUseCase } from '../../usecase/createUserUseCase'
import { PassportAuthenticator, Server } from 'typescript-rest'
import express from 'express'
import { UpsertAuthenticationUseCase } from '../../usecase/upsertAuthenticationUseCase'
import * as passport from 'passport'

const loginUseCase = container.get<LoginUseCase>(types.LoginUseCase)
const createUserUseCase = container.get<CreateUserUseCase>(
  types.CreateUserUserCase
)
const upsertAuthenticationUseCase = container.get<UpsertAuthenticationUseCase>(
  types.UpsertAuthenticationUseCase
)

const list: {
  strategy: any
  provider: AuthenticationProvider
  option: {}
  customCallback?: (...args: any) => void
}[] = [
  {
    strategy: TwitterStrategy,
    provider: AuthenticationProvider.Twitter,
    option: {
      consumerKey: process.env.TWITTER_CONSUMER_KEY,
      consumerSecret: process.env.TWITTER_CONSUMER_SECRET
    }
  },
  {
    strategy: GoogleStrategy,
    provider: AuthenticationProvider.Google,
    option: {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      scope: ['profile']
    }
  },
  {
    strategy: AppleStrategy,
    provider: AuthenticationProvider.Apple,
    option: {
      clientID: process.env.APPLE_CLIENT_ID,
      teamID: process.env.APPLE_TEAM_ID,
      keyID: process.env.APPLE_KEY_ID,
      scope: '',
      privateKeyLocation: process.env.APPLE_PRIVATE_KEY_LOCATION
    },
    customCallback: async (
      req: express.Request,
      accessToken: string,
      refreshToken: string,
      idToken: string,
      _: passport.Profile,
      cb: (err: any, user: any) => void
    ) => {
      const authentication: UserAuthenticationEntity = {
        provider: AuthenticationProvider.Apple,
        social_id: idToken,
        social_username: 'apple user',
        social_display_name: 'apple user',
        access_token: accessToken,
        refresh_token: refreshToken
      }
      await authenticate(req, authentication, cb)
    }
  }
]

async function authenticate(
  req: express.Request,
  authentication: UserAuthenticationEntity,
  cb: (err: any, user: any) => void
) {
  if (!req.user) {
    const loginResult = await loginUseCase.login(authentication)
    if (loginResult) cb(null, loginResult)
    else cb(null, await createUserUseCase.createUser(authentication))
  } else {
    await upsertAuthenticationUseCase.upsertAuthentication(
      req.user,
      authentication
    )
    cb(null, req.user)
  }
}

export function applyPassport() {
  list.forEach(config => {
    config.option = {
      ...config.option,
      callbackURL: `${process.env.BASE_URL}/v1/auth/${config.provider}`,
      passReqToCallback: true
    }

    if (!config.customCallback)
      config.customCallback = async (
        req: express.Request,
        accessToken: string,
        refreshToken: string,
        profile: passport.Profile,
        cb: (err: any, user: any) => void
      ) => {
        const authentication: UserAuthenticationEntity = {
          provider: config.provider,
          social_id: profile.id,
          social_username: profile.username || '',
          social_display_name: profile.displayName,
          access_token: accessToken,
          refresh_token: refreshToken
        }

        await authenticate(req, authentication, cb)
      }

    const strategy: passport.Strategy = new config.strategy(
      config.option,
      config.customCallback
    )
    Server.registerAuthenticator(
      new PassportAuthenticator(strategy, {
        strategyName: config.provider,
        serializeUser: (user: UserEntity) => JSON.stringify(user),
        deserializeUser: data => JSON.parse(data)
      })
    )
  })
}
