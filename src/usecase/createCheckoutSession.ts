import { OneTimePaymentPlan, RecurringPaymentPlan } from '../entity/paymentPlan'

export interface CreateCheckoutSession {
  createOneTimeCheckoutSession(
    plan: OneTimePaymentPlan,
    twinte_user_id?: string
  ): Promise<string>
  createRecurringCheckoutSession(
    plan: RecurringPaymentPlan,
    twinte_user_id: string
  ): Promise<string>
}
