import {Column, Entity, ManyToOne} from 'typeorm'
import {User} from './user'
import {AuthenticationProvider} from '../../../entity/user'

@Entity()
export class UserAuthentication {
  @Column({
    type: 'enum',
    enum: AuthenticationProvider
  })
  provider!: AuthenticationProvider

  @Column()
  social_id!: string

  @Column()
  social_username!: string

  @Column()
  social_display_name!: string

  @ManyToOne(() => User, user => user.authentications)
  user!:User
}
