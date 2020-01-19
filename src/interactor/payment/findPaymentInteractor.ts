import {FindPaymentUseCase} from '../../usecase/payment/findPaymentUseCase'
import {PaymentUser} from '../../entity/payment/paymentUser'
import {Payment} from '../../entity/payment/payment'
import {inject, injectable} from 'inversify'
import {types} from '../../di/types'
import {PaymentRepository} from '../../interface/repository/payment/paymentRepository'

@injectable()
export class FindPaymentInteractor  implements  FindPaymentUseCase{
  @inject(types.PaymentRepository) paymentRepository!:PaymentRepository
  findByPaymentUser(paymentUser: PaymentUser): Promise<Payment[]> {
    return this.paymentRepository.findByPaymentUser(paymentUser)
  }

  getAllPayment(): Promise<Payment[]> {
    return this.paymentRepository.getAll()
  }

  getTotalAmount(): Promise<number> {
    return this.paymentRepository.getTotalAmount()
  }
}
