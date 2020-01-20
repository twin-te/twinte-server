import { FindPaymentUserUseCase } from '../../usecase/payment/findPaymentUserUseCase'
import { inject, injectable } from 'inversify'
import { PaymentUser } from '../../entity/payment/paymentUser'
import { types } from '../../di/types'
import { PaymentUserRepository } from '../../interface/repository/payment/paymentUserRepository'

@injectable()
export class FindPaymentUserInteractor implements FindPaymentUserUseCase {
  @inject(types.PaymentUserRepository)
  paymentUserRepository!: PaymentUserRepository

  findPaymentUser(payment_user_id: string): Promise<PaymentUser | undefined> {
    return this.paymentUserRepository.findPaymentUser(payment_user_id)
  }

  findPaymentUserByTwinteUserId(
    twinte_user_id: string
  ): Promise<PaymentUser | undefined> {
    return this.paymentUserRepository.findPaymentUserByTwinteUserId(
      twinte_user_id
    )
  }
}
