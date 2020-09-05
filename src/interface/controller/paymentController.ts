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
import { UpdatePaymentUserUseCase } from '../../usecase/payment/updatePaymentUserUseCase'
import { PaymentUser } from '../../entity/payment/paymentUser'
import { GetAllPaidUserUseCase } from './getAllPaidUserUseCase'
import {
  CheckoutInfo,
  GetCheckoutInfoUseCase
} from '../../usecase/payment/getCheckoutInfoUseCase'
import { BadRequestError } from 'typescript-rest/dist/server/model/errors'

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

  @inject(types.UpdatePaymentUserUseCase)
  private updatePaymentUserUseCase!: UpdatePaymentUserUseCase

  @inject(types.GetAllPaidUserUseCase)
  private getAllPaidUserUseCase!: GetAllPaidUserUseCase

  @inject(types.GetCheckoutInfoUseCase)
  private getCheckoutInfoUseCase!: GetCheckoutInfoUseCase

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

  findSubscription(subscription_id: string): Promise<Subscription | undefined> {
    return this.findSubscriptionUseCase.findSubscription(subscription_id)
  }

  unsubscribe(subscription_id: string): Promise<void> {
    return this.unsubscribeUseCase.unsubscribe(subscription_id)
  }

  async updatePaymentUser(
    user: UserEntity,
    params: { nickname: string | null; link: string | null }
  ): Promise<PaymentUser> {
    if (params.link && !/^https?:\/\/.+/.test(params.link))
      throw new BadRequestError('linkの値が不正です')
    const paymentUser = await this.findPaymentUserUseCase.findPaymentUserByTwinteUserId(
      user.twinte_user_id
    )
    if (!paymentUser) throw new Error('PaymentUserが存在しません')
    paymentUser.nickname = params.nickname
    paymentUser.link = params.link
    return this.updatePaymentUserUseCase.updatePaymentUser(paymentUser)
  }

  getPaymentUser(user: UserEntity): Promise<PaymentUser | undefined> {
    return this.findPaymentUserUseCase.findPaymentUserByTwinteUserId(
      user.twinte_user_id
    )
  }

  getCheckoutSessionInfo(
    checkoutID: string
  ): Promise<CheckoutInfo | undefined> {
    return this.getCheckoutInfoUseCase.getCheckoutInfo(checkoutID)
  }

  async getAllPaidUsers(): Promise<{
    count: number
    users: { nickname: string; link: string | null }[]
  }> {
    const users = await this.getAllPaidUserUseCase.getAllPaidUsers()
    return {
      count: users.length,
      users: users
        .filter(u => u.nickname !== null)
        .map(u => ({
          nickname: u.nickname!!,
          link: u.link
        }))
    }
  }

  private async findOrCreatePaymentUserByTwinteUserId(twinte_user_id: string) {
    const paymentUser = await this.findPaymentUserUseCase.findPaymentUserByTwinteUserId(
      twinte_user_id
    )
    if (paymentUser) return paymentUser
    else return this.createPaymentUserUseCase.createPaymentUser(twinte_user_id)
  }
}
