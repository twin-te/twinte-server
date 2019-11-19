import { User, UserAuthentication } from '../entity/user'

export interface LoginUseCase {
  login(authentication: UserAuthentication): Promise<User | undefined>
}
