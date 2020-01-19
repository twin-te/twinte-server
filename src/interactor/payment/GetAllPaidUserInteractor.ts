import { GetAllPaidUserUseCase } from '../../interface/controller/getAllPaidUserUseCase'
import { inject, injectable } from 'inversify'
import { PaymentUser } from '../../entity/payment/paymentUser'
import { types } from '../../di/types'
import { PaymentUserRepository } from '../../interface/repository/payment/paymentUserRepository'
import { PaymentRepository } from '../../interface/repository/payment/paymentRepository'

@injectable()
export class GetAllPaidUserInteractor implements GetAllPaidUserUseCase {
  @inject(types.PaymentUserRepository)
  paymentUserRepository!: PaymentUserRepository
  @inject(types.PaymentRepository) paymentRepository!: PaymentRepository

  async getAllPaidUsers(): Promise<PaymentUser[]> {
    const users = await this.paymentUserRepository.findAll()
    const filterBit = await Promise.all<boolean>(
      users.map<Promise<boolean>>(async u => {
        const payments = await this.paymentRepository.findByPaymentUser(u)
        // 一つでも成功した寄付があったかどうか
        return (
          payments.filter(p => p.status === 'succeeded' && p.amount > 0)
            .length > 0
        )
      })
    )

    return users.filter((_, i) => filterBit[i])
  }
}
