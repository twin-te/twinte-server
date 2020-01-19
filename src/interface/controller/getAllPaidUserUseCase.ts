import { PaymentUser } from '../../entity/payment/paymentUser'

export interface GetAllPaidUserUseCase {
  getAllPaidUsers(): Promise<PaymentUser[]>
}
