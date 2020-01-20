import { PaymentUser } from './paymentUser'

type BillInterval = 'day' | 'week' | 'month' | 'year'

// プランそのものの定義
export interface Plan {
  plan_id: string
  name: string
  amount: number
  interval: BillInterval
}

type SubscriptionStatus = 'active' | 'pending' | 'canceled'

// ユーザーのサブスク状態
export interface Subscription {
  subscription_id: string
  paymentUser: PaymentUser
  plan: Plan[]
  status: SubscriptionStatus
  start_at: number
  cancel_at: number | null
}
