import { UserRepository } from '../../interface/repository/userRepository'
import { injectable } from 'inversify'
import { UserEntity, UserAuthenticationEntity } from '../../entity/user'
import { User as pUser } from './orm/user'
import { UserAuthentication as pUserAuthentication } from './orm/userAuthentication'
import { getConnection } from './index'
import { Repository } from 'typeorm'
import uuid = require('uuid')

@injectable()
export class PUserRepository implements UserRepository {
  private userRepository: Repository<pUser>
  private authenticationRepository: Repository<pUserAuthentication>
  constructor() {
    this.userRepository = getConnection().getRepository(pUser)
    this.authenticationRepository = getConnection().getRepository(
      pUserAuthentication
    )
  }

  async createUser(
    authentication: UserAuthenticationEntity
  ): Promise<UserEntity> {
    const user = new pUser()
    user.twinte_user_id = uuid()
    user.twinte_username = authentication.social_display_name
    const pAuthentication = new pUserAuthentication()
    pAuthentication.social_id = authentication.social_id
    pAuthentication.social_username = authentication.social_username
    pAuthentication.social_display_name = authentication.social_display_name
    pAuthentication.provider = authentication.provider
    pAuthentication.access_token = authentication.access_token
    pAuthentication.refresh_token = authentication.refresh_token
    user.authentications = [pAuthentication]
    const res = await this.userRepository.save(user)
    return {
      twinte_user_id: res.twinte_user_id,
      twinte_username: res.twinte_username
    }
  }

  findUserById(twinte_user_id: string): Promise<UserEntity | undefined> {
    return this.userRepository.findOne({ twinte_user_id })
  }

  async findUserByAuthentication(
    authentication: UserAuthenticationEntity
  ): Promise<UserEntity | undefined> {
    const res = await this.authenticationRepository.findOne(
      {
        provider: authentication.provider,
        social_id: authentication.social_id
      },
      {
        relations: ['user']
      }
    )
    if (!res) return undefined
    return {
      twinte_user_id: res.user.twinte_user_id,
      twinte_username: res.user.twinte_username
    }
  }

  async upsertAuthentication(
    user: UserEntity,
    authentication: UserAuthenticationEntity
  ): Promise<
    | { user: UserEntity; authentications: UserAuthenticationEntity[] }
    | undefined
  > {
    const targetUser = await this.userRepository.findOne(
      { twinte_user_id: user.twinte_user_id },
      { relations: ['authentications'] }
    )
    if (!targetUser) return undefined

    const existAuthentication = targetUser.authentications.find(
      a => a.provider === authentication.provider
    )
    if (existAuthentication) {
      existAuthentication.social_id = authentication.social_id
      existAuthentication.social_username = authentication.social_username
      existAuthentication.social_display_name =
        authentication.social_display_name
      existAuthentication.access_token = authentication.access_token
      existAuthentication.refresh_token = authentication.refresh_token
    } else {
      const newAuthentication = new pUserAuthentication()
      newAuthentication.provider = authentication.provider
      newAuthentication.social_id = authentication.social_id
      newAuthentication.social_username = authentication.social_username
      newAuthentication.social_display_name = authentication.social_display_name
      newAuthentication.access_token = authentication.access_token
      newAuthentication.refresh_token = authentication.refresh_token
      targetUser.authentications.push(newAuthentication)
    }
    const res = await this.userRepository.save(targetUser)
    return {
      user: {
        twinte_user_id: res.twinte_user_id,
        twinte_username: res.twinte_username
      },
      authentications: res.authentications
    }
  }

  async getUserAuthentication(
    user: UserEntity
  ): Promise<UserAuthenticationEntity[] | undefined> {
    const res = await this.userRepository.findOne(
      {
        twinte_user_id: user.twinte_user_id
      },
      { relations: ['authentications'] }
    )
    if (!res) return undefined
    return res.authentications
  }
}
