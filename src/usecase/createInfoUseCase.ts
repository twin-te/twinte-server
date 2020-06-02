import { Moment } from 'moment-timezone'
import { Information } from '../entity/info'

export interface CreateInfoUseCase {
  createInfo(title: string, content: string, date: Moment): Promise<Information>
}
