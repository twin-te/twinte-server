import {CheckoutSession} from '../../entity/payment/checkoutSession'

export interface SaveCheckoutSessionUseCase {
  saveCheckoutSession(session: CheckoutSession) : Promise<CheckoutSession>
}
