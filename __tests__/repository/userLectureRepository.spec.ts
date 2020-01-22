import { clearDatabase, initDatabaseAndGetDiContainer } from '../heler'
import { UserLectureRepository } from '../../src/interface/repository/userLectureRepository'
import { types } from '../../src/di/types'
import { UserRepository } from '../../src/interface/repository/userRepository'
import {
  AuthenticationProvider,
  UserAuthenticationEntity,
  UserEntity
} from '../../src/entity/user'
import { Day, Module } from 'twinte-parser'
import { LectureRepository } from '../../src/interface/repository/lectureRepository'
import { LectureEntity } from '../../src/entity/lecture'
import { UserLectureEntity } from '../../src/entity/period'

let userLectureRepository: UserLectureRepository
const name = 'createUserTest'
const testUserAuthentication: UserAuthenticationEntity = {
  provider: AuthenticationProvider.Twitter,
  social_id: name,
  social_username: name,
  social_display_name: name,
  access_token: 'access_token',
  refresh_token: 'refresh_token'
}
let testUser: UserEntity
let testLecture: LectureEntity

beforeAll(async () => {
  const container = await initDatabaseAndGetDiContainer()
  userLectureRepository = container.get(types.UserLectureRepository)
  const userRepository = container.get<UserRepository>(types.UserRepository)
  testUser = await userRepository.createUser(testUserAuthentication)
  const lectureRepository = container.get<LectureRepository>(
    types.LectureRepository
  )
  const lectures = [
    {
      name: '講義A',
      lectureCode: 'A123456',
      year: 2019,
      twinte_lecture_id: '',
      instructor: 'Twin:te',
      details: [
        { module: Module.SpringA, day: Day.Mon, period: 1, room: '3A404' }
      ]
    }
  ]
  testLecture = (await lectureRepository.upsertLectures(lectures))[0]
})

let testUserLecture: UserLectureEntity

test('CreateUserLecture', async () => {
  const res = await userLectureRepository.createUserLecture(
    testUser,
    testLecture.twinte_lecture_id
  )
  expect(res).toBeTruthy()
  expect(res!!.twinte_lecture_id).toBe(testLecture.twinte_lecture_id)
  expect(res!!.lecture_name).toBe(testLecture.name)
  expect(res!!.instructor).toBe(testLecture.instructor)
  expect(res!!.attendance).toBe(0)
  expect(res!!.late).toBe(0)
  expect(res!!.absence).toBe(0)
  expect(res!!.memo).toBe('')
  testUserLecture = res!!
})

test('FindUserLectureById', async () => {
  const res = await userLectureRepository.findUserLectureById(
    testUser,
    testUserLecture.user_lecture_id
  )
  expect(res).toMatchObject(testUserLecture)
})

test('UpdateUserLecture', async () => {
  testUserLecture.attendance = 3
  testUserLecture.late = 2
  testUserLecture.absence = 1
  testUserLecture.memo = 'memo'
  testUserLecture.instructor = 'te:twin'
  testUserLecture.lecture_name = '講義B'
  const res = await userLectureRepository.updateUserLecture(
    testUser,
    testUserLecture
  )
  expect(res).toMatchObject(testUserLecture)
})

let customTestUserLecture: UserLectureEntity
test('CreateCustomUserLecture', async () => {
  const customUserLecture = {
    year: 2019,
    lecture_name: '講義C',
    instructor: 'Twin-te'
  }
  const res = await userLectureRepository.createCustomUserLecture(
    testUser,
    customUserLecture.year,
    customUserLecture.lecture_name,
    customUserLecture.instructor
  )
  expect(res).toBeTruthy()
  expect(res!!.twinte_lecture_id).toBeNull()
  expect(res!!.lecture_name).toBe(customUserLecture.lecture_name)
  expect(res!!.instructor).toBe(customUserLecture.instructor)
  expect(res!!.attendance).toBe(0)
  expect(res!!.late).toBe(0)
  expect(res!!.absence).toBe(0)
  expect(res!!.memo).toBe('')
  customTestUserLecture = res
})

test('GetAllUserLecture', async () => {
  const res = await userLectureRepository.getAllUserLecture(testUser)
  expect(res).toEqual(
    expect.arrayContaining([
      expect.objectContaining(testUserLecture),
      expect.objectContaining(customTestUserLecture)
    ])
  )
})

test('RemoveUserLecture', async () => {
  let res = await userLectureRepository.removeUserLecture(
    testUser,
    testUserLecture.user_lecture_id!!
  )
  expect(res).toBeTruthy()
  res = await userLectureRepository.removeUserLecture(
    testUser,
    customTestUserLecture.user_lecture_id!!
  )
  expect(res).toBeTruthy()
  const res2 = await userLectureRepository.getAllUserLecture(testUser)
  expect(res2.length).toBe(0)
})

afterAll(() => clearDatabase())
