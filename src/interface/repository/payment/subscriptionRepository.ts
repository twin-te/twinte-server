import {Subscription} from '../../../entity/payment/subscription'

export interface SubscriptionRepository {
  find(subscription_id: string) : Promise<Subscription>
  unsubscribe(subscription_id: string) : Promise<void>
}
