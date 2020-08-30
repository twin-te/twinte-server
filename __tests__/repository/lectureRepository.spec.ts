import { clearDatabase, initRepository } from '../helper'
import { types } from '../../src/di/types'
import { LectureRepository } from '../../src/interface/repository/lectureRepository'
import { LectureEntity, LectureFormat } from '../../src/entity/lecture'
import { Day, Module } from 'twinte-parser'
import container, { configureDiContainer } from '../../src/di/inversify.config'

let lectureRepository: LectureRepository

let lectures: LectureEntity[]

const year = 2019

beforeAll(async () => {
  await initRepository()
  configureDiContainer([types.LectureRepository])
  lectureRepository = container.get(types.LectureRepository)
  lectures = [
    {
      name: '講義A',
      lectureCode: 'A123456',
      year: 2019,
      twinte_lecture_id: '',
      instructor: 'Twin:te',
      overview: 'overview',
      remarks: 'remarks',
      standardYear: [1, 2],
      credits: 1.5,
      type: 1,
      details: [
        { module: Module.SpringA, day: Day.Mon, period: 1, room: '3A404' }
      ],
      formats: [LectureFormat.OnlineAsynchronous]
    }
  ]
})

test('InsertLecture', async () => {
  const tmp = lectures.length
  lectures = await lectureRepository.upsertLectures(lectures)
  expect(lectures.length).toBe(tmp)
})

test('FindLectureById', async () => {
  const res = await lectureRepository.findLectureById(
    lectures[0].twinte_lecture_id
  )
  expect(res).toMatchObject(lectures[0])
})

test('FindLectureByLectureCode', async () => {
  const res = await lectureRepository.findLectureByLectureCode(
    year,
    lectures[0].lectureCode
  )
  expect(res).toMatchObject(lectures[0])
})

test('SearchLectureByKeyword', async () => {
  const res = await lectureRepository.searchLectureByKeyword(
    2019,
    lectures[0].name
  )
  expect(res[0]).toMatchObject(lectures[0])
})

afterAll(() => clearDatabase())
