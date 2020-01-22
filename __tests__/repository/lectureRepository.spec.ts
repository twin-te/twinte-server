import { clearDatabase, initDatabaseAndGetDiContainer } from '../heler'
import { types } from '../../src/di/types'
import { RemoteLectureRepository } from '../../src/interface/repository/remoteLectureRepository'
import { LectureRepository } from '../../src/interface/repository/lectureRepository'
import { LectureEntity } from '../../src/entity/lecture'

let remoteLectureRepository: RemoteLectureRepository
let lectureRepository: LectureRepository

let lectures: LectureEntity[]
let someLectures: LectureEntity[]

const year = 2019

beforeAll(async () => {
  const container = await initDatabaseAndGetDiContainer()
  remoteLectureRepository = container.get(types.RemoteLectureRepository)
  lectureRepository = container.get(types.LectureRepository)
  lectures = await remoteLectureRepository.fetchRemoteDatabase(year)
  someLectures = lectures.slice(-5)
})

test('InsertLecture', async () => {
  someLectures = await lectureRepository.upsertLectures(someLectures)
  expect(someLectures.length).toBe(5)
})

test('FindLectureById', async () => {
  const res = await lectureRepository.findLectureById(
    someLectures[0].twinte_lecture_id
  )
  expect(res).toMatchObject(someLectures[0])
})

test('FindLectureByLectureCode', async () => {
  const res = await lectureRepository.findLectureByLectureCode(
    year,
    someLectures[0].lectureCode
  )
  expect(res).toMatchObject(someLectures[0])
})

test('SearchLectureByKeyword', async () => {
  const res = await lectureRepository.searchLectureByKeyword(
    someLectures[0].name
  )
  expect(res[0]).toMatchObject(someLectures[0])
})

afterAll(() => clearDatabase())
