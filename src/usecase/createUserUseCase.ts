import { UserEntity, UserAuthenticationEntity } from '../entity/user'

export interface CreateUserUseCase {
  createUser(authentication: UserAuthenticationEntity): Promise<UserEntity>
}
