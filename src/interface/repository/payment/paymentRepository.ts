import { PaymentUser } from '../../../entity/payment/paymentUser'
import { Payment } from '../../../entity/payment/payment'

export interface PaymentRepository {
  findByPaymentUser(paymentUser: PaymentUser): Promise<Payment[]>
  findByPaymentID(id: string): Promise<Payment | undefined>
  getAll(): Promise<Payment[]>
  getTotalAmount(): Promise<number>
}
