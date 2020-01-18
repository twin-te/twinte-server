import { PaymentUser } from '../../entity/paymentUser'

export interface PaymentUserRepository {
  findPaymentUser(payment_user_id: string): Promise<PaymentUser>
  findPaymentUserByTwinteID(twinte_user_id: string): Promise<PaymentUser>
  savePaymentUser(paymentUser: PaymentUser): Promise<PaymentUser>
}
