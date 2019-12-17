import { UpsertAuthenticationUseCase } from '../usecase/upsertAuthenticationUseCase'
import { UserEntity, UserAuthenticationEntity } from '../entity/user'
import { inject, injectable } from 'inversify'
import { types } from '../di/types'
import { UserRepository } from '../interface/repository/userRepository'

@injectable()
export class UpsertAuthenticationInteractor
  implements UpsertAuthenticationUseCase {
  @inject(types.UserRepository) userRepository!: UserRepository

  upsertAuthentication(
    user: UserEntity,
    authentication: UserAuthenticationEntity
  ): Promise<boolean> {
    return this.userRepository.upsertAuthentication(user, authentication)
  }
}
