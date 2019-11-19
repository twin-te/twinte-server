import { LectureRepository } from '../../interface/repository/lectureRepository'
import { Lecture as pLecture } from './orm/lecture'
import { injectable } from 'inversify'
import { Like, Repository } from 'typeorm'
import { Lecture } from '../../entity/lecture'
import { LectureDate } from './orm/lectureDate'
import uuid = require('uuid')
import { getConnection } from './index'

@injectable()
export class PLectureRepository implements LectureRepository {
  repository: Repository<pLecture>

  constructor() {
    this.repository = getConnection().getRepository(pLecture)
  }

  async findLectureById(twinteLectureId: string): Promise<Lecture | undefined> {
    const pLec = await this.repository.findOne(twinteLectureId, {
      relations: ['dates']
    })

    if (!pLec) return undefined

    return this.pLecToLec(pLec)
  }

  async searchLectureByKeyword(keyword: string): Promise<Lecture[]> {
    const pLecs = await this.repository.find({
      relations: ['dates'],
      where: {
        lecture_name: Like(`%${keyword}%`)
      }
    })
    return pLecs.map(el => this.pLecToLec(el))
  }

  async upsertLectures(lectures: Lecture[]): Promise<Lecture[]> {
    return Promise.all(
      lectures.map(async lec => {
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
        return this.pLecToLec(await this.repository.save(updateTarget))
      })
    )
  }

  private pLecToLec(pLec: pLecture): Lecture {
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
  ): Promise<Lecture | undefined> {
    const res = await this.repository.findOne(
      { year, lecture_code },
      { relations: ['dates'] }
    )
    if (!res) return undefined
    return this.pLecToLec(res)
  }
}
