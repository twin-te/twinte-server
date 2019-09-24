import { Container } from 'inversify'
import 'reflect-metadata'
import { KdbRepository } from './application/repositories/kdbRepository'
import { TYPES } from './types'
import { TwinteParserKdbRepository } from './interfaces/database/twinteParserKdbRepository'
import { LectureRepository } from './application/repositories/lectureRepository'
import { MongoLectureRepository } from './interfaces/database/mongoLectureRepository'
import { UpdateKdbUseCase } from './application/usecases/updateKdbUseCase'
import { FindLectureUseCase } from './application/usecases/findLectureUseCase'
import { LectureController } from './interfaces/controllers/lectureController'
const container = new Container()

container.bind<KdbRepository>(TYPES.KdbRepository).to(TwinteParserKdbRepository)
container
  .bind<LectureRepository>(TYPES.LectureRepository)
  .to(MongoLectureRepository)
container.bind<UpdateKdbUseCase>(TYPES.UpdateKdbUseCase).to(UpdateKdbUseCase)
container
  .bind<FindLectureUseCase>(TYPES.FindLectureUseCase)
  .to(FindLectureUseCase)
container.bind<LectureController>(TYPES.LectureController).to(LectureController)

export default container
