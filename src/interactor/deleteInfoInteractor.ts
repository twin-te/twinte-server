import { DeleteInfoUseCase } from '../usecase/deleteInfoUseCase'
import { inject, injectable } from 'inversify'
import { types } from '../di/types'
import { InformationRepository } from '../interface/repository/informationRepository'

@injectable()
export class DeleteInfoInteractor implements DeleteInfoUseCase {
  @inject(types.InformationRepository)
  informationRepository!: InformationRepository
  deleteInfo(id: string): Promise<boolean> {
    return this.informationRepository.delete(id)
  }
}
