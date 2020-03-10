import { Subscription } from '../../../entity/payment/subscription'
import { PaymentUser } from '../../../entity/payment/paymentUser'

export interface SubscriptionRepository {
  find(subscription_id: string): Promise<Subscription | undefined>
  findByPaymentUser(paymentUser: PaymentUser): Promise<Subscription[]>
  unsubscribe(subscription_id: string): Promise<void>
}
