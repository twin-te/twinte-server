import { LoginUseCase } from '../usecase/loginUseCase'
import { UserEntity, UserAuthenticationEntity } from '../entity/user'
import { inject, injectable } from 'inversify'
import { types } from '../di/types'
import { UserRepository } from '../interface/repository/userRepository'

@injectable()
export class LoginInteractor implements LoginUseCase {
  @inject(types.UserRepository) userRepository!: UserRepository
  login(
    authentication: UserAuthenticationEntity
  ): Promise<UserEntity | undefined> {
    return this.userRepository.findUserByAuthentication(authentication)
  }
}
