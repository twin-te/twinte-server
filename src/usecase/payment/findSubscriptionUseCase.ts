import { PaymentUser } from '../../entity/payment/paymentUser'
import { Subscription } from '../../entity/payment/subscription'

export interface FindSubscriptionUseCase {
  findSubscriptionByPaymentUser(
    paymentUser: PaymentUser
  ): Promise<Subscription[]>
  findSubscription(subscription_id: string): Promise<Subscription>
}
