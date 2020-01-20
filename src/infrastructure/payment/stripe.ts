import _stripe from 'stripe'

if (!process.env.STRIPE_API_KEY)
  throw new Error('process.env.STRIPE_API_KEYが指定されていません')

// @ts-ignore
const stripe = new _stripe(process.env.STRIPE_API_KEY, {})

export { stripe }
