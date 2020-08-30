import { LectureRepository } from '../../interface/repository/lectureRepository'
import { Lecture as pLecture } from './orm/lecture'
import { LectureDate as pLecDate } from './orm/lectureDate'
import { LectureStandardYear as pLecYear } from './orm/lectureStandardYear'
import { LectureFormat as pLecFormat } from './orm/lectureFormat'
import { injectable } from 'inversify'
import { Like, Repository } from 'typeorm'
import { LectureEntity } from '../../entity/lecture'
import { LectureDate } from './orm/lectureDate'
import uuid = require('uuid')
import { getConnection } from './index'
import _cliProgress from 'cli-progress'
import { getLogger } from 'log4js'
import { LectureStandardYear } from './orm/lectureStandardYear'
import { LectureFormat } from './orm/lectureFormat'

const logger = getLogger('database')

@injectable()
export class PLectureRepository implements LectureRepository {
  repository: Repository<pLecture>
  dateRepository: Repository<pLecDate>
  yearRepository: Repository<pLecYear>
  formatRepository: Repository<pLecFormat>
  constructor() {
    this.repository = getConnection().getRepository(pLecture)
    this.dateRepository = getConnection().getRepository(pLecDate)
    this.yearRepository = getConnection().getRepository(pLecYear)
    this.formatRepository = getConnection().getRepository(pLecFormat)
  }

  async findLectureById(
    twinteLectureId: string
  ): Promise<LectureEntity | undefined> {
    const pLec = await this.repository.findOne(twinteLectureId, {
      relations: ['dates', 'standardYear', 'formats']
    })

    if (!pLec) return undefined

    return this.pLecToLec(pLec)
  }

  async searchLectureByKeyword(
    year: number,
    keyword: string
  ): Promise<LectureEntity[]> {
    const pLecs = await this.repository.find({
      relations: ['dates', 'standardYear', 'formats'],
      where: [
        { lecture_name: Like(`%${keyword}%`), year },
        { lecture_code: Like(`${keyword}%`), year },
        { instructor: Like(`%${keyword}%`), year }
      ]
    })
    return pLecs.map(el => this.pLecToLec(el))
  }

  async upsertLectures(lectures: LectureEntity[]): Promise<LectureEntity[]> {
    logger.info('講義データベースを更新しています')
    const bar = new _cliProgress.Bar({}, _cliProgress.Presets.shades_classic)
    const newLectures: LectureEntity[] = []
    // 低RAM環境での負荷軽減のため、直列で挿入を行う
    bar.start(lectures.length, 0)
    for (let i = 0; i < lectures.length; i++) {
      const lec = lectures[i]
      let updateTarget = await this.repository.findOne(
        {
          lecture_code: lec.lectureCode,
          year: lec.year
        },
        { relations: ['dates', 'standardYear', 'formats'] }
      )

      if (!updateTarget) {
        updateTarget = new pLecture()
        updateTarget.twinte_lecture_id = uuid()
        lec.twinte_lecture_id = updateTarget.twinte_lecture_id
        newLectures.push(lec)
      }

      updateTarget.lecture_name = lec.name
      updateTarget.instructor = lec.instructor
      updateTarget.year = lec.year
      updateTarget.lecture_code = lec.lectureCode
      await Promise.all(
        updateTarget.dates.map(d => this.dateRepository.delete(d))
      )
      updateTarget.dates = lec.details.map(el => {
        const ld = new LectureDate()
        ld.module = el.module
        ld.day = el.day
        ld.period = el.period
        ld.room = el.room
        return ld
      })
      updateTarget.credits = lec.credits
      updateTarget.overview = lec.overview
      updateTarget.remarks = lec.remarks
      updateTarget.type = lec.type
      await Promise.all(
        updateTarget.standardYear.map(y => this.yearRepository.delete(y))
      )
      updateTarget.standardYear = lec.standardYear.map(e => {
        const y = new LectureStandardYear()
        y.standardYear = e
        return y
      })
      await Promise.all(
        updateTarget.formats.map(f => this.formatRepository.delete(f))
      )
      updateTarget.formats = lec.formats.map(el => {
        const f = new LectureFormat()
        f.format = el
        return f
      })

      await this.pLecToLec(await this.repository.save(updateTarget))
      bar.update(i)
    }
    bar.stop()
    logger.info('更新が完了しました')
    return newLectures
  }

  private pLecToLec(pLec: pLecture): LectureEntity {
    return {
      twinte_lecture_id: pLec.twinte_lecture_id,
      year: pLec.year,
      lectureCode: pLec.lecture_code,
      name: pLec.lecture_name,
      details: pLec.dates,
      instructor: pLec.instructor,
      credits: Number(pLec.credits),
      overview: pLec.overview,
      remarks: pLec.remarks,
      type: pLec.type,
      standardYear: pLec.standardYear.map(e => e.standardYear),
      formats: pLec.formats.map(f => f.format)
    }
  }

  async findLectureByLectureCode(
    year: number,
    lecture_code: string
  ): Promise<LectureEntity | undefined> {
    const res = await this.repository.findOne(
      { year, lecture_code },
      { relations: ['dates', 'standardYear', 'formats'] }
    )
    if (!res) return undefined
    return this.pLecToLec(res)
  }
}
