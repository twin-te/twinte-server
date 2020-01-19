import {inject, injectable} from 'inversify'
import {UpdatePaymentUserUseCase} from '../../usecase/payment/updatePaymentUserUseCase'
import {PaymentUser} from '../../entity/payment/paymentUser'
import {PaymentUserRepository} from '../../interface/repository/payment/paymentUserRepository'
import {types} from '../../di/types'

@injectable()
export class UpdatePaymentUserInteractor implements UpdatePaymentUserUseCase{
  @inject(types.PaymentUserRepository)paymentUserRepository!: PaymentUserRepository
  updatePaymentUser(paymentUser: PaymentUser): Promise<PaymentUser> {
    return this.paymentUserRepository.update(paymentUser)
  }

}
