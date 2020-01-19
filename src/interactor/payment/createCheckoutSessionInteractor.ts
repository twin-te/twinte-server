import {CreateCheckoutSessionUseCase} from '../../usecase/payment/createCheckoutSessionUseCase'
import {inject, injectable} from 'inversify'
import {PaymentUser} from '../../entity/payment/paymentUser'
import {types} from '../../di/types'
import {CheckoutSessionRepository} from '../../interface/repository/payment/checkoutSessionRepository'

@injectable()
export class CreateCheckoutSessionInteractor implements CreateCheckoutSessionUseCase{
  @inject(types.CheckoutSessionRepository) checkoutSessionRepository!: CheckoutSessionRepository
  createOneTimeCheckoutSession(amount: number, paymentUser?: PaymentUser): Promise<string> {
    return this.checkoutSessionRepository.createOneTimeCheckoutSession(amount, paymentUser)
  }

  createSubscriptionCheckoutSession(plan_id: string, paymentUser: PaymentUser): Promise<string> {
    return this.checkoutSessionRepository.createSubscriptionCheckoutSession(plan_id, paymentUser)
  }
}
