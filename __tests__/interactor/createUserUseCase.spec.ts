import { types } from '../../src/di/types'
import { CreateUserUseCase } from '../../src/usecase/createUserUseCase'
import { AuthenticationProvider } from '../../src/entity/user'
import { clearDatabase, initDatabaseAndGetDiContainer } from '../heler'

let useCase: CreateUserUseCase

beforeAll(async () => {
  const container = await initDatabaseAndGetDiContainer()
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
