import {Plan} from '../../entity/payment/subscription'

export interface GetCheckoutInfoUseCase {
  getCheckoutInfo(checkoutID: string): Promise<CheckoutInfo | undefined>
}

export type OneTimeCheckoutInfo = {
  type: 'OneTime'
  amount: number
}

export type SubscriptionCheckoutInfo = {
  type: 'Subscription'
  plan: Plan[]
}

export type CheckoutInfo = OneTimeCheckoutInfo | SubscriptionCheckoutInfo
