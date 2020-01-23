import { types } from '../../src/di/types'
import { clearDatabase, initRepository } from '../helper'
import { UpdateLectureDatabaseUseCase } from '../../src/usecase/updateLectureDatabaseUseCase'
import container, { configureDiContainer } from '../../src/di/inversify.config'

let useCase: UpdateLectureDatabaseUseCase

beforeAll(async () => {
  await initRepository()
  configureDiContainer([
    types.UpdateLectureDatabaseUseCase,
    types.LectureRepository,
    types.RemoteLectureRepository
  ])
  useCase = container.get<UpdateLectureDatabaseUseCase>(
    types.UpdateLectureDatabaseUseCase
  )
})

test('UpdateLectureDatabase', async () => {
  jest.setTimeout(99999999)
  const res = await useCase.updateLectureDatabase(2019)
  expect(res.length).toBeGreaterThan(0)
})

afterAll(() => clearDatabase())
