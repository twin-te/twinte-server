import { LectureRepository } from '../../interface/repository/lectureRepository'
import { Lecture as pLecture } from './orm/lecture'
import { injectable } from 'inversify'
import { Like, Repository } from 'typeorm'
import { LectureEntity } from '../../entity/lecture'
import { LectureDate } from './orm/lectureDate'
import uuid = require('uuid')
import { getConnection } from './index'
import _cliProgress from 'cli-progress'
import { getLogger } from 'log4js'

const logger = getLogger('database')

@injectable()
export class PLectureRepository implements LectureRepository {
  repository: Repository<pLecture>

  constructor() {
    this.repository = getConnection().getRepository(pLecture)
  }

  async findLectureById(
    twinteLectureId: string
  ): Promise<LectureEntity | undefined> {
    const pLec = await this.repository.findOne(twinteLectureId, {
      relations: ['dates']
    })

    if (!pLec) return undefined

    return this.pLecToLec(pLec)
  }

  async searchLectureByKeyword(keyword: string): Promise<LectureEntity[]> {
    const pLecs = await this.repository.find({
      relations: ['dates'],
      where: [
        { lecture_name: Like(`%${keyword}%`) },
        { lecture_code: Like(`${keyword}%`) },
        { instructor: Like(`%${keyword}%`) }
      ]
    })
    return pLecs.map(el => this.pLecToLec(el))
  }

  async upsertLectures(lectures: LectureEntity[]): Promise<LectureEntity[]> {
    logger.info('講義データベースを更新しています')
    const bar = new _cliProgress.Bar({}, _cliProgress.Presets.shades_classic)

    // 低RAM環境での負荷軽減のため、直列で挿入を行う
    bar.start(lectures.length, 0)
    for (let i = 0; i < lectures.length; i++) {
      const lec = lectures[i]
      let updateTarget = await this.repository.findOne(
        {
          lecture_code: lec.lectureCode,
          year: lec.year
        },
        { relations: ['dates'] }
      )

      if (!updateTarget) {
        updateTarget = new pLecture()
        updateTarget.twinte_lecture_id = uuid()
      }

      updateTarget.lecture_name = lec.name
      updateTarget.instructor = lec.instructor
      updateTarget.year = lec.year
      updateTarget.lecture_code = lec.lectureCode
      updateTarget.dates = lec.details.map(el => {
        const ld = new LectureDate()
        ld.module = el.module
        ld.day = el.day
        ld.period = el.period
        ld.room = el.room
        return ld
      })
      await this.pLecToLec(await this.repository.save(updateTarget))
      bar.update(i)
    }
    bar.stop()
    logger.info('更新が完了しました')
    return []
  }

  private pLecToLec(pLec: pLecture): LectureEntity {
    return {
      twinte_lecture_id: pLec.twinte_lecture_id,
      year: pLec.year,
      lectureCode: pLec.lecture_code,
      name: pLec.lecture_name,
      details: pLec.dates,
      instructor: pLec.instructor
    }
  }

  async findLectureByLectureCode(
    year: number,
    lecture_code: string
  ): Promise<LectureEntity | undefined> {
    const res = await this.repository.findOne(
      { year, lecture_code },
      { relations: ['dates'] }
    )
    if (!res) return undefined
    return this.pLecToLec(res)
  }
}
