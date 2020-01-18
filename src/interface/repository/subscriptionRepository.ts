import {RecurringPaymentPlan} from '../../entity/paymentPlan'

export interface SubscriptionRepository {
  findSubscription(subscription_id: string): Promise<RecurringPaymentPlan>
  cancelSubscription(subscription_id: string): Promise<RecurringPaymentPlan>
}
