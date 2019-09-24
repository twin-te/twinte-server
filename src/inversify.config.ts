import { Container } from 'inversify'
import 'reflect-metadata'
import { KdbRepository } from './application/repositories/kdbRepository'
import { TYPES } from './types'
import { TwinteParserKdbRepository } from './interfaces/database/twinteParserKdbRepository'
import { LectureRepository } from './application/repositories/lectureRepository'
import { MongoLectureRepository } from './interfaces/database/mongoLectureRepository'
import { KdbService } from './application/services/KdbService'
import { LectureService } from './application/services/LectureService'
import { UserRepository } from './application/repositories/userRepository'
import { MongoUserRepository } from './interfaces/database/mongoUserRepository'
import { UserService } from './application/services/UserService'
const container = new Container()

container.bind<KdbRepository>(TYPES.KdbRepository).to(TwinteParserKdbRepository)
container
  .bind<LectureRepository>(TYPES.LectureRepository)
  .to(MongoLectureRepository)
container.bind<UserRepository>(TYPES.UserRepository).to(MongoUserRepository)
container.bind<KdbService>(TYPES.KdbService).to(KdbService)
container.bind<LectureService>(TYPES.LectureService).to(LectureService)
container.bind<UserService>(TYPES.UserService).to(UserService)

export default container
