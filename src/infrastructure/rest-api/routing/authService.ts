import { Context, GET, Path, PathParam, ServiceContext } from 'typescript-rest'
import { AuthenticationProvider } from '../../../entity/user'
import passport from 'passport'

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
