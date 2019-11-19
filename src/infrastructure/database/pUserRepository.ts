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
  private repository: Repository<pUser>
  constructor() {
    this.repository = getConnection().getRepository(pUser)
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
    user.authentications = [pAuthentication]
    return this.repository.save(user)
  }

  findUserById(twinte_user_id: string): Promise<User | undefined> {
    return this.repository.findOne(
      { twinte_user_id },
      { relations: ['authentications'] }
    )
  }
}
