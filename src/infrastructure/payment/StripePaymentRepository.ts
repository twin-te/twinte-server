import { injectable } from 'inversify'
import { PaymentRepository } from '../../interface/repository/payment/paymentRepository'
import { PaymentUser } from '../../entity/payment/paymentUser'
import { Payment, PaymentStatus } from '../../entity/payment/payment'
import { stripe } from './stripe'
import { Stripe } from 'stripe'

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

    const invoices = await stripe.invoices.list({
      customer: paymentUser ? paymentUser.payment_user_id : undefined
    })

    while (invoices.has_more) {
      const moreInvoices = await stripe.invoices.list({
        starting_after: invoices.data.slice(-1)[0].id,
        customer: paymentUser ? paymentUser.payment_user_id : undefined
      })
      invoices.data.push(...moreInvoices.data)
      invoices.has_more = moreInvoices.has_more
    }

    payments.push(
      ...intents.data.map((i: Stripe.PaymentIntent) => {
        const obj: Payment = {
          type: 'OneTime',
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

    payments.push(
      ...invoices.data.map((i: Stripe.Invoice) => {
        let s: PaymentStatus = 'pending'
        if (i.status === 'paid') s = 'succeeded'
        else if (i.status === 'deleted') s = 'canceled'

        const obj: Payment = {
          type: 'Subscription',
          id: i.id,
          paymentUser: paymentUser ? paymentUser : null,
          amount: i.total,
          status: s,
          paid_at: i.status_transitions.paid_at
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
        .reduce(
          (p: Stripe.PaymentIntent, c: Stripe.PaymentIntent) =>
            p.amount + c.amount
        )
      if (!intents.has_more) break
      lastID = intents.data.slice(-1)[0].id
    }
    lastID = undefined
    while (true) {
      // @ts-ignore
      const invoices = await stripe.invoices.list({
        limit: 100,
        starting_after: lastID
      })
      sum += invoices.data
        .filter((i: Stripe.Invoice) => i.status === 'paid')
        .reduce((p: Stripe.Invoice, c: Stripe.Invoice) => p.total + c.total)
      if (!invoices.has_more) break
      lastID = invoices.data.slice(-1)[0].id
    }

    return sum
  }
}
