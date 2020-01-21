import { types } from '../../src/di/types'
import { CreateUserUseCase } from '../../src/usecase/createUserUseCase'
import { AuthenticationProvider } from '../../src/entity/user'
import { connect } from '../../src/infrastructure/database'
import envCheck from '../../src/envCheck'

let useCase: CreateUserUseCase

beforeAll(async () => {
  envCheck()
  await connect()
  const { default: container } = await import('../../src/di/inversify.config')
  useCase = container.get<CreateUserUseCase>(types.CreateUserUserCase)
})

test('createUserUseCase', async () => {
  const userEntity = await useCase.createUser({
    provider: AuthenticationProvider.Twitter,
    social_id: 'test',
    social_username: 'test',
    social_display_name: 'test',
    access_token: 'access_token',
    refresh_token: 'refresh_token'
  })
  expect(userEntity).toBeTruthy()
  expect(userEntity.twinte_username).toBe('test')
})
