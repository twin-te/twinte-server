import { CheckoutSession } from '../../entity/payment/checkoutSession'

export interface FindCheckoutUseCase {
  findCheckout(checkoutID: string): Promise<CheckoutSession | undefined>
}
