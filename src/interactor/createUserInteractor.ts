import { CreateUserUseCase } from '../usecase/createUserUseCase'
import { UserEntity, UserAuthenticationEntity } from '../entity/user'
import { inject, injectable } from 'inversify'
import { types } from '../di/types'
import { UserRepository } from '../interface/repository/userRepository'

@injectable()
export class CreateUserInteractor implements CreateUserUseCase {
  @inject(types.UserRepository) private userRepository!: UserRepository

  createUser(authentication: UserAuthenticationEntity): Promise<UserEntity> {
    return this.userRepository.createUser(authentication)
  }
}
