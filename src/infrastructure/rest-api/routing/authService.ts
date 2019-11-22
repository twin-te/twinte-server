import { Context, GET, Path, PathParam, ServiceContext } from 'typescript-rest'
import { AuthenticationProvider } from '../../../entity/user'
import passport from 'passport'
import { Tags } from 'typescript-rest-swagger'

@Path('/auth')
@Tags('認証')
export class AuthService {
  @Context
  context!: ServiceContext

  /**
   * 認証系のエンドポイント
   * @param provider 連携サービス名
   */
  @Path(':provider')
  @GET
  login(@PathParam('provider') provider: AuthenticationProvider) {
    return new Promise((resolve, _) => {
      passport.authenticate(provider)(
        this.context.request,
        this.context.response,
        () => {
          this.context.response.redirect(process.env.REDIRECT_URL || '/')
          resolve()
        }
      )
    })
  }
}
