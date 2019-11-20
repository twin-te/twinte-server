import { UserEntity, UserAuthenticationEntity } from '../entity/user'

export interface LoginUseCase {
  login(authentication: UserAuthenticationEntity): Promise<UserEntity | undefined>
}
