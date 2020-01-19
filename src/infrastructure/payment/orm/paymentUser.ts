import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm'
import { User } from '../../database/orm/user'

@Entity()
export class PaymentUser {
  @PrimaryColumn()
  payment_user_id!: string

  @Column({
    nullable: true,
    type: 'varchar'
  })
  nickname!: string | null

  @Column({
    nullable: true,
    type: 'varchar'
  })
  link!: string | null

  @OneToOne(() => User)
  @JoinColumn()
  user!: User
}
