import {SaveCheckoutSessionUseCase} from '../../usecase/payment/saveCheckoutSessionUseCase'
import {inject, injectable} from 'inversify'
import {CheckoutSession} from '../../entity/payment/checkoutSession'
import {types} from '../../di/types'
import {CheckoutSessionRepository} from '../../interface/repository/payment/checkoutSessionRepository'

@injectable()
export class SaveCheckoutSessionInteractor implements SaveCheckoutSessionUseCase{
  @inject(types.CheckoutSessionRepository) checkoutSessionRepository!: CheckoutSessionRepository
  saveCheckoutSession(session: CheckoutSession): Promise<CheckoutSession> {
    return this.checkoutSessionRepository.save(session)
  }
}
