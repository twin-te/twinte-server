import { User, UserAuthentication } from '../entity/user'

export interface UpsertAuthenticationUseCase {
  upsertAuthentication(
    user: User,
    authentication: UserAuthentication
  ): Promise<boolean>
}
