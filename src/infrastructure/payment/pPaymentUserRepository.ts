import {injectable} from 'inversify'
import {PaymentUserRepository} from '../../interface/repository/payment/paymentUserRepository'
import {PaymentUser} from '../../entity/payment/paymentUser'
import {Repository} from 'typeorm'
import {PaymentUser as pPaymentUser} from './orm/paymentUser'
import {getConnection} from '../database'

@injectable()
export class  PPaymentUserRepository implements PaymentUserRepository {

  paymentUserRepository: Repository<pPaymentUser>
  constructor() {
    this.paymentUserRepository = getConnection().getRepository(pPaymentUser)
  }

  async findPaymentUser(payment_user_id: string): Promise<PaymentUser | undefined> {
    const paymentUser = await this.paymentUserRepository.findOne({
      payment_user_id
    },{relations: ['user']})
    if(!paymentUser)return undefined
    return {
      payment_user_id: paymentUser.payment_user_id,
      twinte_user_id: paymentUser.user.twinte_user_id
    }
  }

  async findPaymentUserByTwinteUserId(twinte_user_id: string): Promise<PaymentUser | undefined> {
    const paymentUser = await this.paymentUserRepository.findOne({
      user: {twinte_user_id}
    },{relations: ['user']})
    if(!paymentUser)return undefined
    return {
      payment_user_id: paymentUser.payment_user_id,
      twinte_user_id: paymentUser.user.twinte_user_id
    }
  }

}
