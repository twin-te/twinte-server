import { clearDatabase, initRepository } from '../helper'
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
import { PeriodEntity, UserLectureEntity } from '../../src/entity/period'
import { TimetableRepository } from '../../src/interface/repository/timetableRepository'
import container, { configureDiContainer } from '../../src/di/inversify.config'

let timetableRepository: TimetableRepository

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
let testUserLecture: UserLectureEntity
// @ts-ignore
let testCustomUserLecture: UserLectureEntity

beforeAll(async () => {
  await initRepository()
  configureDiContainer([
    types.TimetableRepository,
    types.UserRepository,
    types.UserLectureRepository,
    types.LectureRepository
  ])

  timetableRepository = container.get(types.TimetableRepository)
  const userLectureRepository = container.get<UserLectureRepository>(
    types.UserLectureRepository
  )
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
  testUserLecture = (await userLectureRepository.createUserLecture(
    testUser,
    testLecture.twinte_lecture_id
  ))!!
  const customUserLecture = {
    year: 2019,
    lecture_name: '講義C',
    instructor: 'Twin-te'
  }
  testCustomUserLecture = await userLectureRepository.createCustomUserLecture(
    testUser,
    customUserLecture.year,
    customUserLecture.lecture_name,
    customUserLecture.instructor
  )
})
let testPeriod: PeriodEntity
test('UpsertPeriod', async () => {
  testPeriod = {
    year: 2019,
    module: Module.SpringA,
    day: Day.Mon,
    period: 1,
    room: '3A404',
    user_lecture_id: testUserLecture.user_lecture_id
  }
  let res = await timetableRepository.upsertPeriod(testUser, testPeriod)
  expect(res).toMatchObject(testPeriod)
})

test('GetPeriod', async () => {
  const res = await timetableRepository.getPeriod(
    testUser,
    testPeriod.year,
    testPeriod.module,
    testPeriod.day,
    testPeriod.period
  )
  expect(res).toMatchObject(testPeriod)
})

test('GetTimetable', async () => {
  const res = await timetableRepository.getTimetable(
    testUser,
    testPeriod.year,
    testPeriod.module,
    testPeriod.day
  )
  expect(res).toEqual(
    expect.arrayContaining([
      {
        ...testPeriod,
        lecture_name: testUserLecture.lecture_name,
        lecture_code: testLecture.lectureCode,
        instructor: testUserLecture.instructor
      }
    ])
  )
})

test('RemovePeriod', async () => {
  const res = await timetableRepository.removePeriod(
    testUser,
    testPeriod.year,
    testPeriod.module,
    testPeriod.day,
    testPeriod.period
  )
  expect(res).toBeTruthy()
  const res2 = await timetableRepository.getTimetable(
    testUser,
    testPeriod.year,
    testPeriod.module,
    testPeriod.day
  )
  expect(res2.length).toBe(0)
})

afterAll(() => clearDatabase())
