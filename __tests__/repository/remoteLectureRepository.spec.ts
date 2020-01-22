import { clearDatabase, initDatabaseAndGetDiContainer } from '../heler'
import { types } from '../../src/di/types'
import { RemoteLectureRepository } from '../../src/interface/repository/remoteLectureRepository'

let remoteLectureRepository: RemoteLectureRepository

beforeAll(async () => {
  const container = await initDatabaseAndGetDiContainer()
  remoteLectureRepository = container.get(types.RemoteLectureRepository)
})

test('GetLectureFromRemoteRepository', async () => {
  const lectures = await remoteLectureRepository.fetchRemoteDatabase(2019)
  expect(lectures.length).toBeGreaterThan(0)
})

afterAll(() => clearDatabase())
