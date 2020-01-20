import { injectable } from 'inversify'
import { PaymentUserRepository } from '../../interface/repository/payment/paymentUserRepository'
import { PaymentUser } from '../../entity/payment/paymentUser'
import { Repository } from 'typeorm'
import { PaymentUser as pPaymentUser } from './orm/paymentUser'
import { getConnection } from '../database'
import { User as pUser } from '../database/orm/user'
import { stripe } from './stripe'

@injectable()
export class PPaymentUserRepository implements PaymentUserRepository {
  userRepository: Repository<pUser>
  paymentUserRepository: Repository<pPaymentUser>
  constructor() {
    this.paymentUserRepository = getConnection().getRepository(pPaymentUser)
    this.userRepository = getConnection().getRepository(pUser)
  }

  async findPaymentUser(
    payment_user_id: string
  ): Promise<PaymentUser | undefined> {
    const paymentUser = await this.paymentUserRepository.findOne(
      {
        payment_user_id
      },
      { relations: ['user'] }
    )
    if (!paymentUser) return undefined
    return {
      payment_user_id: paymentUser.payment_user_id,
      twinte_user_id: paymentUser.user.twinte_user_id,
      nickname: paymentUser.nickname,
      link: paymentUser.link
    }
  }

  async findPaymentUserByTwinteUserId(
    twinte_user_id: string
  ): Promise<PaymentUser | undefined> {
    const paymentUser = await this.paymentUserRepository.findOne(
      {
        user: { twinte_user_id }
      },
      { relations: ['user'] }
    )
    if (!paymentUser) return undefined
    return {
      payment_user_id: paymentUser.payment_user_id,
      twinte_user_id: paymentUser.user.twinte_user_id,
      nickname: paymentUser.nickname,
      link: paymentUser.link
    }
  }

  async create(twinte_user_id: string): Promise<PaymentUser> {
    const twinteUser = await this.userRepository.findOne({
      twinte_user_id
    })
    if (!twinteUser) throw new Error('指定されたTwinteユーザーは存在しません')

    const customer = await stripe.customers.create()

    const newUser = new pPaymentUser()
    newUser.payment_user_id = customer.id
    newUser.user = twinteUser
    await this.paymentUserRepository.save(newUser)
    return {
      twinte_user_id,
      payment_user_id: customer.id,
      nickname: null,
      link: null
    }
  }

  async update(paymentUser: PaymentUser): Promise<PaymentUser> {
    const user = await this.paymentUserRepository.findOne({
      payment_user_id: paymentUser.payment_user_id,
      user: { twinte_user_id: paymentUser.twinte_user_id }
    })
    if (!user) throw new Error('PaymentUserが見つかりません')
    user.nickname = paymentUser.nickname
    user.link = paymentUser.link
    await this.paymentUserRepository.save(user)
    return paymentUser
  }

  async findAll(): Promise<PaymentUser[]> {
    const users = await this.paymentUserRepository.find({ relations: ['user'] })
    return users.map(u => ({
      twinte_user_id: u.user.twinte_user_id,
      payment_user_id: u.payment_user_id,
      nickname: u.nickname,
      link: u.link
    }))
  }
}
