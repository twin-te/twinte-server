// 支払いユーザー
export interface PaymentUser {
  twinte_user_id: string
  payment_user_id: string
  nickname: string | null
  link: string | null
}
