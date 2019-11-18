import { Container } from 'inversify'
import { LectureRepository } from '../interface/repository/lectureRepository'
import { types } from './types'
import { PLectureRepository } from '../infrastructure/database/pLectureRepository'
import { RemoteLectureRepository } from '../interface/repository/remoteLectureRepository'
import { KdbRemoteLectureRepository } from '../infrastructure/database/kdbRemoteLectureRepository'
import { UpdateLectureDatabaseUseCase } from '../usecase/UpdateLectureDatabaseUseCase'
import { UpdateLectureDatabaseInteractor } from '../interactor/UpdateLectureDatabaseInteractor'
import { LectureController } from '../interface/controller/lectureController'
import { SearchLectureByKeywordUseCase } from '../usecase/SearchLectureByKeywordUseCase'
import { SearchLectureByKeywordInteractor } from '../interactor/SearchLectureByKeywordInteractor'

const container = new Container()

container
  .bind<LectureRepository>(types.LectureRepository)
  .to(PLectureRepository)
container
  .bind<RemoteLectureRepository>(types.RemoteLectureRepository)
  .to(KdbRemoteLectureRepository)
container
  .bind<UpdateLectureDatabaseUseCase>(types.UpdateLectureDatabaseUseCase)
  .to(UpdateLectureDatabaseInteractor)
container
  .bind<SearchLectureByKeywordUseCase>(types.SearchLectureByKeywordUseCase)
  .to(SearchLectureByKeywordInteractor)

container.bind(LectureController).to(LectureController)

export default container
