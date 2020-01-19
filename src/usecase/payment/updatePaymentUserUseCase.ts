import { PaymentUser } from '../../entity/payment/paymentUser'

export interface UpdatePaymentUserUseCase {
  updatePaymentUser(paymentUser: PaymentUser): Promise<PaymentUser>
}
