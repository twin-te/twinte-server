import { PaymentUser } from '../../entity/payment/paymentUser'
import { Payment } from '../../entity/payment/payment'

export interface FindPaymentUseCase {
  findByPaymentUser(paymentUser: PaymentUser): Promise<Payment[]>
  findByPaymentID(id: string): Promise<Payment | undefined>
  getAllPayment(): Promise<Payment[]>
  getTotalAmount(): Promise<number>
}
