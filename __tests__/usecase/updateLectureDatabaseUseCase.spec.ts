import { types } from '../../src/di/types'
import { clearDatabase, initDatabaseAndGetDiContainer } from '../helper'
import { UpdateLectureDatabaseUseCase } from '../../src/usecase/updateLectureDatabaseUseCase'

let useCase: UpdateLectureDatabaseUseCase

beforeAll(async () => {
  const container = await initDatabaseAndGetDiContainer()
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
