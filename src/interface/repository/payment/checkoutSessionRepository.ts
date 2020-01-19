import {CheckoutSession} from '../../../entity/payment/checkoutSession'
import {PaymentUser} from '../../../entity/payment/paymentUser'

export interface CheckoutSessionRepository {
  createOneTimeCheckoutSession(amount: number, paymentUser?: PaymentUser): Promise<string>
  createSubscriptionCheckoutSession(plan_id: string, paymentUser:PaymentUser): Promise<string>
  find(checkout_session_id: string) : Promise<CheckoutSession>
  findByPaymentUser(paymentUser: PaymentUser | null) : Promise<CheckoutSession[]>
  save(session: CheckoutSession): Promise<CheckoutSession>
}
