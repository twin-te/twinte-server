import { InformationRepository } from '../../interface/repository/informationRepository'
import { Information } from '../../entity/info'
import { Raw, Repository } from 'typeorm'
import { Information as pInfo } from './orm/information'
import { getConnection } from './index'
import moment, { Moment } from 'moment-timezone'
import { injectable } from 'inversify'
import uuid from 'uuid'

@injectable()
export class PInformationRepository implements InformationRepository {
  repository: Repository<pInfo>

  constructor() {
    this.repository = getConnection().getRepository(pInfo)
  }

  async create(
    title: string,
    content: string,
    moment: Moment,
    tag: string
  ): Promise<Information> {
    const info = new pInfo()
    info.info_id = uuid()
    info.title = title
    info.content = content
    info.tag = tag
    info.date = moment.format()
    return this.transform(await this.repository.save(info))
  }

  async delete(id: string): Promise<boolean> {
    const target = await this.repository.findOne({ info_id: id })
    if (!target) throw new Error('指定された情報は見つかりませんでした')
    await this.repository.delete(target)
    return true
  }

  async find(
    unreleased: boolean,
    limit: number,
    offset: number
  ): Promise<Information[]> {
    if (unreleased) {
      const res = await this.repository.find({
        take: limit,
        skip: offset,
        order: {
          date: 'ASC'
        }
      })
      return res.map(i => this.transform(i))
    } else {
      const res = await this.repository.find({
        where: {
          date: unreleased ? undefined : Raw(alias => `${alias} <= now()`)
        },
        take: limit,
        skip: offset,
        order: {
          date: 'ASC'
        }
      })
      return res.map(i => this.transform(i))
    }
  }

  async update(info: Information): Promise<Information> {
    const target = await this.repository.findOne({ info_id: info.id })
    if (!target) throw new Error('指定された情報は見つかりませんでした')
    target.title = info.title
    target.content = info.content
    target.date = info.date.format()
    return this.transform(await this.repository.save(target))
  }

  transform({ date, info_id, ...e }: pInfo): Information {
    return {
      id: info_id,
      date: moment(date),
      ...e
    }
  }
}
