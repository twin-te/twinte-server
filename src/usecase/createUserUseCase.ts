import {User, UserAuthentication} from "../entity/user"

export interface CreateUserUseCase {
  createUser(authentication: UserAuthentication): Promise<User>
}
