import { UpdateInfoUseCase } from '../usecase/updateInfoUseCase'
import { inject, injectable } from 'inversify'
import { Information } from '../entity/info'
import { types } from '../di/types'
import { InformationRepository } from '../interface/repository/informationRepository'

@injectable()
export class UpdateInfoInteractor implements UpdateInfoUseCase {
  @inject(types.InformationRepository)
  informationRepository!: InformationRepository
  updateInfo(info: Information): Promise<Information> {
    return this.informationRepository.update(info)
  }
}
