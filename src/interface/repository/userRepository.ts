import {User, UserAuthentication} from '../../entity/user'


export interface UserRepository {
  findUserById(twinte_user_id: string): Promise<User | undefined>
  createUser(authentication: UserAuthentication): Promise<User>
}
