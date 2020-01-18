import { PaymentUser } from '../entity/paymentUser'

export interface CreatePaymentUser {
  createPaymentUser(twinte_user_id: string): Promise<PaymentUser>
}
