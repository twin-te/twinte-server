import { types } from '../../src/di/types'
import { CreateUserUseCase } from '../../src/usecase/createUserUseCase'
import { AuthenticationProvider } from '../../src/entity/user'
import { clearDatabase, initRepository } from '../helper'
import container, { configureDiContainer } from '../../src/di/inversify.config'

let useCase: CreateUserUseCase

beforeAll(async () => {
  await initRepository()
  configureDiContainer([types.CreateUserUserCase, types.UserRepository])
  useCase = container.get<CreateUserUseCase>(types.CreateUserUserCase)
})

test('createUserUseCase', async () => {
  const name = 'CreateUserUseCaseUser'
  const userEntity = await useCase.createUser({
    provider: AuthenticationProvider.Twitter,
    social_id: name,
    social_username: name,
    social_display_name: name,
    access_token: 'access_token',
    refresh_token: 'refresh_token'
  })
  expect(userEntity).toBeTruthy()
  expect(userEntity.twinte_username).toBe(name)
})

afterAll(() => clearDatabase())
