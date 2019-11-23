import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm'
import { UserAuthentication } from './userAuthentication'

@Entity()
export class User {
  @PrimaryColumn({
    type: 'uuid'
  })
  twinte_user_id!: string

  @Column()
  twinte_username!: string

  @OneToMany(
    () => UserAuthentication,
    ua => ua.user,
    {
      cascade: true
    }
  )
  authentications!: UserAuthentication[]
}
