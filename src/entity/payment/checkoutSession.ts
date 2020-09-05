import {PaymentUser} from './paymentUser'

interface OneTimeCheckoutSession {
  type: 'OneTime'
  checkout_session_id: string
  paymentUser?: PaymentUser
  payment_intent: string
}

interface SubscriptionCheckoutSession {
  type: 'Subscription'
  checkout_session_id: string
  paymentUser: PaymentUser
  subscription: string
}

// 支払手続きを表す
export type CheckoutSession = OneTimeCheckoutSession | SubscriptionCheckoutSession
