import { CreateInfoUseCase } from '../usecase/createInfoUseCase'
import { Information } from '../entity/info'
import { inject, injectable } from 'inversify'
import { InformationRepository } from '../interface/repository/informationRepository'
import { types } from '../di/types'
import { Moment } from 'moment-timezone'

@injectable()
export class CreateInfoInteractor implements CreateInfoUseCase {
  @inject(types.InformationRepository)
  informationRepository!: InformationRepository
  createInfo(
    title: string,
    content: string,
    date: Moment
  ): Promise<Information> {
    return this.informationRepository.create(title, content, date)
  }
}
