import { Moment } from 'moment-timezone'
import { Information } from '../../entity/info'

export interface InformationRepository {
  find(
    unreleased: boolean,
    limit: number,
    offset: number
  ): Promise<Information[]>
  create(title: string, content: string, moment: Moment): Promise<Information>
  update(info: Information): Promise<Information>
  delete(id: string): Promise<boolean>
}
