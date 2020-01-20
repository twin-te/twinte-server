import { PaymentUser } from '../../entity/payment/paymentUser'

export interface CreatePaymentUserUseCase {
  createPaymentUser(twinte_user_id: string): Promise<PaymentUser>
}
