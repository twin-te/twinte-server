import { clearDatabase, initDatabaseAndGetDiContainer } from '../helper'
import { types } from '../../src/di/types'
import { RemoteLectureRepository } from '../../src/interface/repository/remoteLectureRepository'

let remoteLectureRepository: RemoteLectureRepository

beforeAll(async () => {
  const container = await initDatabaseAndGetDiContainer()
  remoteLectureRepository = container.get(types.RemoteLectureRepository)
})

test('GetLectureFromRemoteRepository', async () => {
  jest.setTimeout(99999999)
  const lectures = await remoteLectureRepository.fetchRemoteDatabase(2019)
  expect(lectures.length).toBeGreaterThan(0)
})

afterAll(() => clearDatabase())
