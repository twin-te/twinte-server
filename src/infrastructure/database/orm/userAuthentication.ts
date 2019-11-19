import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './user'
import { AuthenticationProvider } from '../../../entity/user'

@Entity()
export class UserAuthentication {
  @PrimaryGeneratedColumn()
  id!: number

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

  @Column()
  access_token!: string

  @Column({
    nullable: true
  })
  refresh_token!: string

  @ManyToOne(() => User, user => user.authentications)
  user!: User
}
