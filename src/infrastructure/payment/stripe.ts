import Stripe from 'stripe'

let stripe: Stripe

export function initStripe() {
  // @ts-ignore
  stripe = new Stripe(process.env.STRIPE_API_KEY!!, {})
}

export { stripe }
