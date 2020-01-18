import {
  OneTimePaymentPlan,
  RecurringPaymentPlan
} from '../../entity/paymentPlan'
import { CheckoutSession } from '../../entity/checkoutSession'

export interface CheckoutSessionRepository {
  createOneTimeCheckoutSession(
    plan: OneTimePaymentPlan,
    twinte_user_id?: string
  ): Promise<string>
  createRecurringCheckoutSession(
    plan: RecurringPaymentPlan,
    twinte_user_id: string
  ): Promise<string>
  findBySessionId(checkout_session_id: string): Promise<CheckoutSession>
  findByTwinteUserId(twinte_user_id: string): Promise<CheckoutSession[]>
}
