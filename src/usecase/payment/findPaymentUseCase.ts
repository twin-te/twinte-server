import { PaymentUser } from '../../entity/payment/paymentUser'
import { Payment } from '../../entity/payment/payment'

export interface FindPaymentUseCase {
  findByPaymentUser(paymentUser: PaymentUser): Promise<Payment[]>
  getAllPayment(): Promise<Payment[]>
  getTotalAmount(): Promise<number>
}
