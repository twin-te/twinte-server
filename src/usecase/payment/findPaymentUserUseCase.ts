import { PaymentUser } from '../../entity/payment/paymentUser'

export interface FindPaymentUserUseCase {
  findPaymentUser(payment_id: string): Promise<PaymentUser | undefined>
  findPaymentUserByTwinteUserId(
    twinte_user_id: string
  ): Promise<PaymentUser | undefined>
}
