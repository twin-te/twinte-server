import { Moment } from 'moment'
import { Information } from '../entity/info'

export interface CreateInfoUseCase {
  createInfo(title: string, content: string, date: Moment): Promise<Information>
}
