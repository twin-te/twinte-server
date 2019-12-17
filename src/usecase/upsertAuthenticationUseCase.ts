import { UserEntity, UserAuthenticationEntity } from '../entity/user'

export interface UpsertAuthenticationUseCase {
  upsertAuthentication(
    user: UserEntity,
    authentication: UserAuthenticationEntity
  ): Promise<boolean>
}
