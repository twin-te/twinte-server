import { inject, injectable } from 'inversify'
import { FindInfoUseCase } from '../usecase/finInfoUseCase'
import { types } from '../di/types'
import { InformationRepository } from '../interface/repository/informationRepository'
import { Information } from '../entity/info'

@injectable()
export class FindInfoInteractor implements FindInfoUseCase {
  @inject(types.InformationRepository)
  informationRepository!: InformationRepository
  findInfo(
    unreleased: boolean,
    limit: number,
    offset: number
  ): Promise<Information[]> {
    return this.informationRepository.find(unreleased, limit, offset)
  }
}
