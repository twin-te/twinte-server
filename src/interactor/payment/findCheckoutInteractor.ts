import { FindCheckoutUseCase } from '../../usecase/payment/findCheckoutUseCase'
import { CheckoutSession } from '../../entity/payment/checkoutSession'
import {inject, injectable} from 'inversify'
import { types } from '../../di/types'
import { CheckoutSessionRepository } from '../../interface/repository/payment/checkoutSessionRepository'

@injectable()
export class FindCheckoutInteractor implements FindCheckoutUseCase {
  @inject(types.CheckoutSessionRepository)
  checkoutSessionRepository!: CheckoutSessionRepository
  findCheckout(checkoutID: string): Promise<CheckoutSession | undefined> {
    return this.checkoutSessionRepository.find(checkoutID)
  }
}
