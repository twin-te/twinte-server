import {Context, GET, Path, PreProcessor, ServiceContext} from 'typescript-rest'
import isAuthenticated from '../middleware/isAuthenticated'
import {Tags, Response} from 'typescript-rest-swagger'
import {UserEntity} from '../../../entity/user'

@Path('/users')
@Tags('ユーザー')
@Response(401, '未認証')
@PreProcessor(isAuthenticated)
export class UserService {

  @Context
  context!: ServiceContext

  /**
   * ログイン中のユーザー情報を返す
   */
  @Path('me')
  @GET
  @Response<UserEntity>(200, 'ログイン中のユーザー')
  getMe() {
    return this.context.request.user
  }
}
