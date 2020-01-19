import {PaymentUser} from './paymentUser'

export type PaymentType = 'OneTime' | 'Subscription'
// 一回、サブスク問わず発生した支払い
export interface Payment {
  type: PaymentType
  id: string
  paymentUser: PaymentUser | null,
  amount: number
  paid_at: number
}
