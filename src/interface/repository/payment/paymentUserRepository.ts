import { PaymentUser } from '../../../entity/payment/paymentUser'

export interface PaymentUserRepository {
  findPaymentUser(payment_user_id: string): Promise<PaymentUser>
  findPaymentUserByTwinteUserId(twinte_user_id: string): Promise<PaymentUser>
}
