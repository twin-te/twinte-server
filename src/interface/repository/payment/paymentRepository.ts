import {PaymentUser} from '../../../entity/payment/paymentUser'
import {Payment} from '../../../entity/payment/payment'

export interface PaymentRepository {
  findByPaymentUser(paymentUser: PaymentUser | null): Promise<Payment[]>
  getAll() : Promise<Payment[]>
  getTotalAmount(): Promise<number>
}
