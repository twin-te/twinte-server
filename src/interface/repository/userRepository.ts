import { UserEntity, UserAuthenticationEntity } from '../../entity/user'

export interface UserRepository {
  findUserById(twinte_user_id: string): Promise<UserEntity | undefined>
  findUserByAuthentication(
    authentication: UserAuthenticationEntity
  ): Promise<UserEntity | undefined>
  upsertAuthentication(
    user: UserEntity,
    authentication: UserAuthenticationEntity
  ): Promise<boolean>
  createUser(authentication: UserAuthenticationEntity): Promise<UserEntity>
}
