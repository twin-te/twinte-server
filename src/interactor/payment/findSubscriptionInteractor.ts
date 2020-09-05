import { FindSubscriptionUseCase } from '../../usecase/payment/findSubscriptionUseCase'
import { inject, injectable } from 'inversify'
import { Subscription } from '../../entity/payment/subscription'
import { PaymentUser } from '../../entity/payment/paymentUser'
import { SubscriptionRepository } from '../../interface/repository/payment/subscriptionRepository'
import { types } from '../../di/types'

@injectable()
export class FindSubscriptionInteractor implements FindSubscriptionUseCase {
  @inject(types.SubscriptionRepository)
  subscriptionRepository!: SubscriptionRepository

  findSubscription(subscription_id: string): Promise<Subscription | undefined> {
    return this.subscriptionRepository.find(subscription_id)
  }

  findSubscriptionByPaymentUser(
    paymentUser: PaymentUser
  ): Promise<Subscription[]> {
    return this.subscriptionRepository.findByPaymentUser(paymentUser)
  }
}
