import { clearDatabase, initRepository } from '../helper'
import { types } from '../../src/di/types'
import { RemoteLectureRepository } from '../../src/interface/repository/remoteLectureRepository'
import container, {configureDiContainer} from '../../src/di/inversify.config'

let remoteLectureRepository: RemoteLectureRepository

beforeAll(async () => {
  await initRepository()
  configureDiContainer([types.RemoteLectureRepository])
  remoteLectureRepository = container.get(types.RemoteLectureRepository)
})

test('GetLectureFromRemoteRepository', async () => {
  jest.setTimeout(99999999)
  const lectures = await remoteLectureRepository.fetchRemoteDatabase(2019)
  expect(lectures.length).toBeGreaterThan(0)
})

afterAll(() => clearDatabase())
