import { PaymentUser } from '../../entity/payment/paymentUser'

export interface CreateCheckoutSessionUseCase {
  createOneTimeCheckoutSession(
    amount: number,
    paymentUser?: PaymentUser
  ): Promise<string>
  createSubscriptionCheckoutSession(
    plan_id: string,
    paymentUser: PaymentUser
  ): Promise<string>
}
