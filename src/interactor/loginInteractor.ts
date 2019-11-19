import { LoginUseCase } from '../usecase/loginUseCase'
import { User, UserAuthentication } from '../entity/user'
import { inject, injectable } from 'inversify'
import { types } from '../di/types'
import { UserRepository } from '../interface/repository/userRepository'

@injectable()
export class LoginInteractor implements LoginUseCase {
  @inject(types.UserRepository) userRepository!: UserRepository
  login(authentication: UserAuthentication): Promise<User | undefined> {
    return this.userRepository.findUserByAuthentication(authentication)
  }
}
