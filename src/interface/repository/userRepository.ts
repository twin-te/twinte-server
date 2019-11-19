import { User, UserAuthentication } from '../../entity/user'

export interface UserRepository {
  findUserById(twinte_user_id: string): Promise<User | undefined>
  findUserByAuthentication(
    authentication: UserAuthentication
  ): Promise<User | undefined>
  upsertAuthentication(
    user: User,
    authentication: UserAuthentication
  ): Promise<boolean>
  createUser(authentication: UserAuthentication): Promise<User>
}
