import { injectable } from 'inversify'
import { PaymentRepository } from '../../interface/repository/payment/paymentRepository'
import { PaymentUser } from '../../entity/payment/paymentUser'
import { stripe } from './stripe'
import { Stripe } from 'stripe'
import { Payment } from '../../entity/payment/payment'

@injectable()
export class StripePaymentRepository implements PaymentRepository {
  private async find(paymentUser?: PaymentUser) {
    const payments: Payment[] = []
    // 一回限りの支払いを取得
    const intents = await stripe.paymentIntents.list({
      limit: 100,
      customer: paymentUser ? paymentUser.payment_user_id : undefined
    })

    while (intents.has_more) {
      const moreIntents = await stripe.paymentIntents.list({
        limit: 100,
        starting_after: intents.data.slice(-1)[0].id,
        customer: paymentUser ? paymentUser.payment_user_id : undefined
      })
      intents.data.push(...moreIntents.data)
      intents.has_more = moreIntents.has_more
    }

    payments.push(
      ...intents.data.map((i: Stripe.PaymentIntent) => {
        const obj: Payment = {
          type: i.invoice ? 'Subscription' : 'OneTime',
          id: i.id,
          paymentUser: paymentUser ? paymentUser : null,
          amount: i.amount,
          paid_at: i.status === 'succeeded' ? i.created : null,
          status:
            i.status === 'succeeded' || i.status === 'canceled'
              ? i.status
              : 'pending'
        }
        return obj
      })
    )

    return payments
  }

  async findByPaymentUser(paymentUser: PaymentUser): Promise<Payment[]> {
    return this.find(paymentUser)
  }

  getAll(): Promise<Payment[]> {
    return this.find()
  }

  async getTotalAmount(): Promise<number> {
    let sum = 0
    let lastID: undefined | string = undefined

    // 一回限りの支払いを取得
    while (true) {
      // @ts-ignore
      const intents = await stripe.paymentIntents.list({
        limit: 100,
        starting_after: lastID
      })
      sum += intents.data
        .filter((i: Stripe.PaymentIntent) => i.status === 'succeeded')
        .map((p: Stripe.PaymentIntent) => p.amount)
        .reduce((p: number, c: number) => p + c)
      if (!intents.has_more) break
      lastID = intents.data.slice(-1)[0].id
    }
    return sum
  }
}
