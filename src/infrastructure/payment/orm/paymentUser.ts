import {Entity, JoinColumn, OneToOne, PrimaryColumn} from 'typeorm'
import {User} from '../../database/orm/user'

@Entity()
export class PaymentUser {
  @PrimaryColumn()
  payment_user_id!: string
  @OneToOne(() => User)
  @JoinColumn()
  user!: User
}
