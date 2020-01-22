import {
  Context,
  GET,
  Path,
  PathParam,
  QueryParam,
  Return,
  ServiceContext
} from 'typescript-rest'
import { AuthenticationProvider } from '../../../entity/user'
import passport from 'passport'
import { Tags } from 'typescript-rest-swagger'

// リダイレクト先を一時的に保存しとく
const redirectMapping: { id: string; redirect_to?: string }[] = []

@Path('/auth')
@Tags('認証')
export class AuthService {
  @Context
  context!: ServiceContext

  /**
   * 認証系のエンドポイント
   * @param provider 連携サービス名
   * @param redirect_to リダイレクト先
   */
  @Path(':provider')
  @GET
  login(
    @PathParam('provider') provider: AuthenticationProvider,
    @QueryParam('redirect-to') redirect_to?: string
  ) {
    // twinte.netのサブドメインのみ許可
    if (
      redirect_to &&
      (process.env.NODE_ENV !== 'production' ||
        /twinte\.net$/.test(redirect_to))
    )
      redirectMapping.push({
        id: this.context.request.session!!.id,
        redirect_to
      })
    return new Promise((resolve, _) => {
      passport.authenticate(provider)(
        this.context.request,
        this.context.response,
        () => {
          const mapping = redirectMapping.find(
            r => r.id === this.context.request.session!!.id
          )
          // リダイレクト先が指定されてればそこへ、
          // なければ環境変数で指定された場所へリダイレクトされる
          this.context.response.redirect(
            (mapping ? mapping.redirect_to : undefined) ||
              process.env.REDIRECT_URL ||
              '/'
          )
          if (mapping) {
            redirectMapping.splice(redirectMapping.indexOf(mapping), 1)
          }
          resolve()
        }
      )
    })
  }

  /**
   * ログアウトする
   */
  @Path('/logout')
  @GET
  async logout() {
    if (this.context.request.session)
      this.context.request.session.destroy(_ => {
        return new Return.MovedPermanently(process.env.REDIRECT_URL || '/')
      })
  }
}
