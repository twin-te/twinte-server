import { clearDatabase, initDatabaseAndGetDiContainer } from '../heler'
import { types } from '../../src/di/types'
import { UserRepository } from '../../src/interface/repository/userRepository'
import {
  AuthenticationProvider,
  UserAuthenticationEntity,
  UserEntity
} from '../../src/entity/user'

let userRepository: UserRepository

beforeAll(async () => {
  const container = await initDatabaseAndGetDiContainer()
  userRepository = container.get(types.UserRepository)
})

afterAll(() => clearDatabase())

let testUser: UserEntity

const name = 'createUserTest'
const testUserAuthentication: UserAuthenticationEntity = {
  provider: AuthenticationProvider.Twitter,
  social_id: name,
  social_username: name,
  social_display_name: name,
  access_token: 'access_token',
  refresh_token: 'refresh_token'
}

test('createUser', async () => {
  testUser = await userRepository.createUser(testUserAuthentication)
  expect(testUser.twinte_username).toBe(name)
})

test('findByTwinteUserId', async () => {
  const res = await userRepository.findUserById(testUser.twinte_user_id)
  expect(res).toMatchObject(testUser)
})

test('findByAuthentication', async () => {
  const res = await userRepository.findUserByAuthentication(
    testUserAuthentication
  )
  expect(res).toMatchObject(testUser)
})

test('upsertAuthentication', async () => {
  const newTestUserAuthentication: UserAuthenticationEntity = {
    provider: AuthenticationProvider.Google,
    social_id: name,
    social_username: name,
    social_display_name: name,
    access_token: 'access_token',
    refresh_token: 'refresh_token'
  }
  const res = await userRepository.upsertAuthentication(
    testUser,
    newTestUserAuthentication
  )
  expect(res).toBeTruthy()
  expect(res!!.user).toMatchObject(testUser)
})
