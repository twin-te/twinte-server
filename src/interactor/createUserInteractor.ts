import {CreateUserUseCase} from "../usecase/createUserUseCase"
import {User, UserAuthentication} from "../entity/user"
import {inject, injectable} from "inversify"
import {types} from "../di/types"
import {UserRepository} from "../interface/repository/userRepository"

@injectable()
export class CreateUserInteractor implements CreateUserUseCase {
  @inject(types.UserRepository)private userRepository!: UserRepository

  createUser(authentication: UserAuthentication): Promise<User> {
    return this.userRepository.createUser(authentication)
  }
}
