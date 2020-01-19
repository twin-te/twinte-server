import { inject, injectable } from 'inversify'
import { Payment } from '../../entity/payment/payment'
import { types } from '../../di/types'
import { CreateCheckoutSessionUseCase } from '../../usecase/payment/createCheckoutSessionUseCase'
import { FindPaymentUseCase } from '../../usecase/payment/findPaymentUseCase'
import { UnsubscribeUseCase } from '../../usecase/payment/unsubscribeUseCase'
import { FindPaymentUserUseCase } from '../../usecase/payment/findPaymentUserUseCase'
import { CreatePaymentUserUseCase } from '../../usecase/payment/createPaymentUserUseCase'
import { UserEntity } from '../../entity/user'
import { FindSubscriptionUseCase } from '../../usecase/payment/findSubscriptionUseCase'
import { Subscription } from '../../entity/payment/subscription'

@injectable()
export class PaymentController {
  @inject(types.CreateCheckoutSessionUseCase)
  private createCheckoutSessionUseCase!: CreateCheckoutSessionUseCase

  @inject(types.FindPaymentUseCase)
  private findPaymentUseCase!: FindPaymentUseCase

  @inject(types.UnsubscribeUseCase)
  private unsubscribeUseCase!: UnsubscribeUseCase

  @inject(types.FindPaymentUserUseCase)
  private findPaymentUserUseCase!: FindPaymentUserUseCase

  @inject(types.CreatePaymentUserUseCase)
  private createPaymentUserUseCase!: CreatePaymentUserUseCase

  @inject(types.FindSubscriptionUseCase)
  private findSubscriptionUseCase!: FindSubscriptionUseCase

  async createOneTimeCheckoutSession(
    amount: number,
    user?: UserEntity
  ): Promise<string> {
    return this.createCheckoutSessionUseCase.createOneTimeCheckoutSession(
      amount,
      user
        ? await this.findOrCreatePaymentUserByTwinteUserId(user.twinte_user_id)
        : undefined
    )
  }
  async createSubscriptionCheckoutSession(
    plan_id: string,
    user: UserEntity
  ): Promise<string> {
    return this.createCheckoutSessionUseCase.createSubscriptionCheckoutSession(
      plan_id,
      await this.findOrCreatePaymentUserByTwinteUserId(user.twinte_user_id)
    )
  }

  async findPaymentByPaymentUser(user: UserEntity): Promise<Payment[]> {
    return this.findPaymentUseCase.findByPaymentUser(
      await this.findOrCreatePaymentUserByTwinteUserId(user.twinte_user_id)
    )
  }

  getAllPayment(): Promise<Payment[]> {
    return this.findPaymentUseCase.getAllPayment()
  }

  getTotalPaymentAmount(): Promise<number> {
    return this.findPaymentUseCase.getTotalAmount()
  }

  async findSubscriptionByPaymentUser(
    user: UserEntity
  ): Promise<Subscription[]> {
    const paymentUser = await this.findPaymentUserUseCase.findPaymentUserByTwinteUserId(
      user.twinte_user_id
    )
    if (!paymentUser) throw new Error('PaymentUserが存在しません')
    return this.findSubscriptionUseCase.findSubscriptionByPaymentUser(
      paymentUser
    )
  }

  findSubscription(subscription_id: string): Promise<Subscription> {
    return this.findSubscriptionUseCase.findSubscription(subscription_id)
  }

  unsubscribe(subscription_id: string): Promise<void> {
    return this.unsubscribeUseCase.unsubscribe(subscription_id)
  }

  private async findOrCreatePaymentUserByTwinteUserId(twinte_user_id: string) {
    const paymentUser = await this.findPaymentUserUseCase.findPaymentUserByTwinteUserId(
      twinte_user_id
    )
    if (paymentUser) return paymentUser
    else return this.createPaymentUserUseCase.createPaymentUser(twinte_user_id)
  }
}
