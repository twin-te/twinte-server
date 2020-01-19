import { inject, injectable } from 'inversify'
import { PaymentUser } from '../../entity/payment/paymentUser'
import { Payment } from '../../entity/payment/payment'
import { types } from '../../di/types'
import { CreateCheckoutSessionUseCase } from '../../usecase/payment/createCheckoutSessionUseCase'
import { FindPaymentUseCase } from '../../usecase/payment/findPaymentUseCase'
import { UnsubscribeUseCase } from '../../usecase/payment/unsubscribeUseCase'

@injectable()
export class PaymentController {
  @inject(types.CreateCheckoutSessionUseCase)
  createCheckoutSessionUseCase!: CreateCheckoutSessionUseCase

  @inject(types.FindPaymentUseCase)
  findPaymentUseCase!: FindPaymentUseCase

  @inject(types.UnsubscribeUseCase)
  unsubscribeUseCase!: UnsubscribeUseCase

  createOneTimeCheckoutSession(
    amount: number,
    paymentUser?: PaymentUser
  ): Promise<string> {
    return this.createCheckoutSessionUseCase.createOneTimeCheckoutSession(
      amount,
      paymentUser
    )
  }
  createSubscriptionCheckoutSession(
    plan_id: string,
    paymentUser: PaymentUser
  ): Promise<string> {
    return this.createCheckoutSessionUseCase.createSubscriptionCheckoutSession(
      plan_id,
      paymentUser
    )
  }

  findByPaymentUser(paymentUser: PaymentUser): Promise<Payment[]> {
    return this.findPaymentUseCase.findByPaymentUser(paymentUser)
  }

  getAllPayment(): Promise<Payment[]> {
    return this.findPaymentUseCase.getAllPayment()
  }

  getTotalAmount(): Promise<number> {
    return this.findPaymentUseCase.getTotalAmount()
  }

  unsubscribe(subscription_id: string): Promise<void> {
    return this.unsubscribeUseCase.unsubscribe(subscription_id)
  }
}
