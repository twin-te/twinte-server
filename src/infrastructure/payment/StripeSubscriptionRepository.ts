import { SubscriptionRepository } from '../../interface/repository/payment/subscriptionRepository'
import { Subscription } from '../../entity/payment/subscription'
import { inject, injectable } from 'inversify'
import { stripe } from './stripe'
import { types } from '../../di/types'
import { FindPaymentUserUseCase } from '../../usecase/payment/findPaymentUserUseCase'
import { Stripe } from 'stripe'
import { PaymentUser } from '../../entity/payment/paymentUser'

@injectable()
export class StripeSubscriptionRepository implements SubscriptionRepository {
  @inject(types.FindPaymentUserUseCase)
  findPaymentUserUseCase!: FindPaymentUserUseCase
  async find(subscription_id: string): Promise<Subscription> {
    const sub = await stripe.subscriptions.retrieve(subscription_id)
    const paymentUser = await this.findPaymentUserUseCase.findPaymentUser(
      sub.customer
    )
    if (!paymentUser) throw new Error('存在するはずのPaymentUserが存在しません')

    return this.transformToSubscriptinEntity(sub, paymentUser)
  }

  unsubscribe(subscription_id: string): Promise<void> {
    return stripe.subscriptions.del(subscription_id)
  }

  async findByPaymentUser(paymentUser: PaymentUser): Promise<Subscription[]> {
    const subscriptions = await stripe.subscriptions.list({
      customer: paymentUser.payment_user_id
    })
    return subscriptions.data.map((s: Stripe.Subscription) =>
      this.transformToSubscriptinEntity(s, paymentUser)
    )
  }

  private transformToSubscriptinEntity(
    sub: Stripe.Subscription,
    paymentUser: PaymentUser
  ): Subscription {
    return {
      paymentUser,
      subscription_id: sub.id,
      plan: sub.items.data.map((i: Stripe.SubscriptionItem) => ({
        plan_id: i.plan.id,
        name: i.plan.nickname || '',
        amount: i.plan.amount || 0,
        interval: i.plan.interval
      })),
      status:
        sub.status === 'active' || sub.status === 'canceled'
          ? sub.status
          : 'pending',
      start_at: sub.start_date,
      cancel_at: sub.canceled_at
    }
  }
}
