import {
  CheckoutInfo,
  GetCheckoutInfoUseCase
} from '../../usecase/payment/getCheckoutInfoUseCase'
import {inject, injectable} from 'inversify'
import { types } from '../../di/types'
import { CheckoutSessionRepository } from '../../interface/repository/payment/checkoutSessionRepository'
import { SubscriptionRepository } from '../../interface/repository/payment/subscriptionRepository'
import { PaymentRepository } from '../../interface/repository/payment/paymentRepository'

@injectable()
export class GetCheckoutInfoInteractor implements GetCheckoutInfoUseCase {
  @inject(types.CheckoutSessionRepository)
  checkoutSessionRepository!: CheckoutSessionRepository
  @inject(types.SubscriptionRepository)
  subscriptionRepository!: SubscriptionRepository
  @inject(types.PaymentRepository) paymentRepository!: PaymentRepository
  async getCheckoutInfo(checkoutID: string): Promise<CheckoutInfo | undefined> {
    const checkout = await this.checkoutSessionRepository.find(checkoutID)
    if (!checkout) return undefined
    if (checkout.type === 'OneTime') {
      const intent = await this.paymentRepository.findByPaymentID(
        checkout.payment_intent
      )
      if (!intent) return undefined
      return {
        type: 'OneTime',
        amount: intent.amount
      }
    } else {
      const sub = await this.subscriptionRepository.find(checkout.subscription)
      if (!sub) return undefined
      return {
        type: 'Subscription',
        plan: sub.plan
      }
    }
  }
}
