import { UserRepository } from '../../interface/repository/userRepository'
import { injectable } from 'inversify'
import { User, UserAuthentication } from '../../entity/user'
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

  createUser(authentication: UserAuthentication): Promise<User> {
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
    return this.userRepository.save(user)
  }

  findUserById(twinte_user_id: string): Promise<User | undefined> {
    return this.userRepository.findOne(
      { twinte_user_id },
      { relations: ['authentications'] }
    )
  }

  async findUserByAuthentication(
    authentication: UserAuthentication
  ): Promise<User | undefined> {
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
    return res.user
  }

  async upsertAuthentication(
    user: User,
    authentication: UserAuthentication
  ): Promise<boolean> {
    const targetUser = await this.userRepository.findOne(
      { twinte_user_id: user.twinte_user_id },
      { relations: ['authentications'] }
    )
    if (!targetUser) return false

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
    await this.userRepository.save(targetUser)
    return true
  }
}
