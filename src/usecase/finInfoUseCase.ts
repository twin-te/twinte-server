import { Information } from '../entity/info'

export interface FindInfoUseCase {
  findInfo(
    unreleased: boolean,
    limit: number,
    offset: number
  ): Promise<Information[]>
}
