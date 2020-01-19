import { PaymentUser } from '../../../entity/payment/paymentUser'

export interface PaymentUserRepository {
  create(twinte_user_id: string): Promise<PaymentUser>
  findPaymentUser(payment_user_id: string): Promise<PaymentUser | undefined>
  findPaymentUserByTwinteUserId(
    twinte_user_id: string
  ): Promise<PaymentUser | undefined>
  findAll(): Promise<PaymentUser[]>
  update(paymentUser: PaymentUser): Promise<PaymentUser>
}
