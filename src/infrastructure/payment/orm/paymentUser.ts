import {Entity, OneToOne, PrimaryColumn} from 'typeorm'
import {User} from '../../database/orm/user'

@Entity()
export class PaymentUser {
  @PrimaryColumn()
  payment_user_id!: string
  @OneToOne(() => User)
  user!: User
}
