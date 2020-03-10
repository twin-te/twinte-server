import { CheckoutSessionRepository } from '../../interface/repository/payment/checkoutSessionRepository'
import { PaymentUser } from '../../entity/payment/paymentUser'
import { CheckoutSession } from '../../entity/payment/checkoutSession'
import { stripe } from './stripe'
import { inject, injectable } from 'inversify'
import { types } from '../../di/types'
import { PaymentUserRepository } from '../../interface/repository/payment/paymentUserRepository'

@injectable()
export class StripeCheckoutSessionRepository
  implements CheckoutSessionRepository {
  @inject(types.PaymentUserRepository)
  paymentUserRepository!: PaymentUserRepository

  async createOneTimeCheckoutSession(
    amount: number,
    paymentUser?: PaymentUser
  ): Promise<string> {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      submit_type: 'donate',
      customer: paymentUser ? paymentUser.payment_user_id : undefined,
      line_items: [
        {
          name: 'Twin:te寄付',
          description: '寄付いただいたお金はTwin:teの運用や開発に使用します',
          images: ['https://www.twinte.net/ogp.jpg'],
          amount,
          currency: 'jpy',
          quantity: 1
        }
      ],
      success_url: `${process.env.BASE_URL}/v1/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: process.env.STRIPE_CANCEL_URL!!
    })
    return session.id
  }

  async createSubscriptionCheckoutSession(
    plan_id: string,
    paymentUser: PaymentUser
  ): Promise<string> {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      submit_type: 'donate',
      customer: paymentUser.payment_user_id,
      subscription_data: {
        items: [
          {
            plan: plan_id
          }
        ]
      },
      success_url: `${process.env.BASE_URL}/v1/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: process.env.STRIPE_CANCEL_URL!!
    })
    return session.id
  }

  async find(
    checkout_session_id: string
  ): Promise<CheckoutSession | undefined> {
    const session = await stripe.checkout.sessions.retrieve(checkout_session_id)
    const paymentUser = session.customer
      ? await this.paymentUserRepository.findPaymentUser(
          typeof session.customer === 'string'
            ? session.customer
            : session.customer.id
        )
      : undefined
    if (session.payment_intent) {
      return {
        type: 'OneTime',
        checkout_session_id: session.id,
        payment_intent:
          typeof session.payment_intent === 'string'
            ? session.payment_intent
            : session.payment_intent.id,
        paymentUser: paymentUser ? paymentUser : undefined
      }
    } else if (session.subscription && paymentUser) {
      return {
        type: 'Subscription',
        checkout_session_id: session.id,
        subscription:
          typeof session.subscription === 'string'
            ? session.subscription
            : session.subscription.id,
        paymentUser: paymentUser
      }
    } else {
      return undefined
    }
  }
}
