import { inject, injectable } from 'inversify'
import { CreateInfoUseCase } from '../../usecase/createInfoUseCase'
import { types } from '../../di/types'
import { FindInfoUseCase } from '../../usecase/finInfoUseCase'
import { UpdateInfoUseCase } from '../../usecase/updateInfoUseCase'
import { DeleteInfoUseCase } from '../../usecase/deleteInfoUseCase'
import { Information } from '../../entity/info'
import moment from 'moment-timezone'

export interface OutputInformationData {
  id: string
  title: string
  content: string
  date: string
}

@injectable()
export class InfoController {
  @inject(types.CreateInfoUseCase)
  createInfoUseCase!: CreateInfoUseCase

  @inject(types.FindInfoUseCase)
  findInfoUseCase!: FindInfoUseCase

  @inject(types.UpdateInfoUseCase)
  updateInfoUseCase!: UpdateInfoUseCase

  @inject(types.DeleteInfoUseCase)
  deleteInfoUseCase!: DeleteInfoUseCase

  async createInfo(
    title: string,
    content: string,
    date: string
  ): Promise<OutputInformationData> {
    return this.transform(
      await this.createInfoUseCase.createInfo(
        title,
        content,
        moment.tz(date, 'Asia/Tokyo')
      )
    )
  }

  async updateInfo(
    id: string,
    title: string,
    content: string,
    date: string
  ): Promise<OutputInformationData> {
    return this.transform(
      await this.updateInfoUseCase.updateInfo({
        id,
        title,
        content,
        date: moment.tz(date, 'Asia/Tokyo')
      })
    )
  }

  async findInfo(
    unreleased: boolean,
    limit: number,
    offset: number
  ): Promise<OutputInformationData[]> {
    return (
      await this.findInfoUseCase.findInfo(unreleased, limit, offset)
    ).map(e => this.transform(e))
  }

  deleteInfo(id: string) {
    return this.deleteInfoUseCase.deleteInfo(id)
  }

  private transform({ date, ...e }: Information): OutputInformationData {
    return {
      date: date.format('YYYY-MM-DD HH:mm:ss'),
      ...e
    }
  }
}
