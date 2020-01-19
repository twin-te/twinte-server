import { UnsubscribeUseCase } from '../../usecase/payment/unsubscribeUseCase'
import { inject, injectable } from 'inversify'
import { types } from '../../di/types'
import { SubscriptionRepository } from '../../interface/repository/payment/subscriptionRepository'

@injectable()
export class UnsubscribeInteractor implements UnsubscribeUseCase {
  @inject(types.SubscriptionRepository)
  subscriptionRepository!: SubscriptionRepository
  unsubscribe(subscription_id: string): Promise<void> {
    return this.subscriptionRepository.unsubscribe(subscription_id)
  }
}
