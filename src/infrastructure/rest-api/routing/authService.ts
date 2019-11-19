import {
  Context,
  ContextResponse,
  Errors,
  GET,
  IgnoreNextMiddlewares,
  Path,
  PathParam,
  PostProcessor,
  PreProcessor,
  Return,
  Security,
  ServiceContext
} from 'typescript-rest'
import express from 'express'
import { AuthenticationProvider } from '../../../entity/user'
import passport from 'passport'
import { ServiceProcessor } from 'typescript-rest/src/server/model/server-types'
import { UnauthorizedError } from 'typescript-rest/dist/server/model/errors'

const validator: ServiceProcessor = (
  req: express.Request,
  res?: express.Response
) => {
  if (!req.isAuthenticated()) throw new UnauthorizedError()
}

@Path('/auth')
export class AuthService {
  @Context
  context!: ServiceContext

  @Path(':provider')
  @GET
  login(@PathParam('provider') provider: AuthenticationProvider) {
    return new Promise((resolve, reject) => {
      passport.authenticate(provider)(
        this.context.request,
        this.context.response,
        () => {
          this.context.response.redirect('/')
          resolve()
        }
      )
    })
  }
}
