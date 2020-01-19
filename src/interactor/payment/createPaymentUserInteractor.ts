import {inject, injectable} from 'inversify'
import {CreatePaymentUserUseCase} from '../../usecase/payment/createPaymentUserUseCase'
import {PaymentUser} from '../../entity/payment/paymentUser'
import {PaymentUserRepository} from '../../interface/repository/payment/paymentUserRepository'
import {types} from '../../di/types'

@injectable()
export class CreatePaymentUserInteractor implements CreatePaymentUserUseCase{
  @inject(types.PaymentUserRepository)paymentUserRepository!: PaymentUserRepository
  createPaymentUser(twinte_user_id: string): Promise<PaymentUser> {
    return this.paymentUserRepository.create(twinte_user_id)
  }
}
