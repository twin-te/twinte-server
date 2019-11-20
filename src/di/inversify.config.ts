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
import { UserRepository } from '../interface/repository/userRepository'
import { PUserRepository } from '../infrastructure/database/pUserRepository'
import { CreateUserUseCase } from '../usecase/createUserUseCase'
import { CreateUserInteractor } from '../interactor/createUserInteractor'
import { LoginUseCase } from '../usecase/loginUseCase'
import { LoginInteractor } from '../interactor/loginInteractor'
import { UpsertAuthenticationUseCase } from '../usecase/upsertAuthenticationUseCase'
import { UpsertAuthenticationInteractor } from '../interactor/upsertAuthenticationInteractor'
import { TimetableRepository } from '../interface/repository/timetableRepository'
import { PTimetableRepository } from '../infrastructure/database/pTimetableRepository'
import { UserLectureRepository } from '../interface/repository/userLectureRepository'
import { PUserLectureRepository } from '../infrastructure/database/pUserLectureRepository'
import { CreateUserLectureUseCase } from '../usecase/createUserLectureUseCase'
import { CreateUserLectureInteractor } from '../interactor/createUserLectureInteractor'
import { TimetableController } from '../interface/controller/timetableController'
import { GetTimetableUseCase } from '../usecase/getTimetableUseCase'
import { GetTimetableInteractor } from '../interactor/getTimetableInteractor'
import { UpsertPeriodUseCase } from '../usecase/upsertPeriodUseCase'
import { UpsertPeriodInteractor } from '../interactor/upsertPeriodInteractor'
import { RemovePeriodUseCase } from '../interactor/removePeriodUseCase'
import { RemovePeriodInteractor } from '../interactor/removePeriodInteractor'

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

container.bind<UserRepository>(types.UserRepository).to(PUserRepository)

container.bind(LectureController).to(LectureController)

container
  .bind<CreateUserUseCase>(types.CreateUserUserCase)
  .to(CreateUserInteractor)

container.bind<LoginUseCase>(types.LoginUseCase).to(LoginInteractor)

container
  .bind<UpsertAuthenticationUseCase>(types.UpsertAuthenticationUseCase)
  .to(UpsertAuthenticationInteractor)

container
  .bind<TimetableRepository>(types.TimetableRepository)
  .to(PTimetableRepository)

container
  .bind<UserLectureRepository>(types.UserLectureRepository)
  .to(PUserLectureRepository)

container
  .bind<CreateUserLectureUseCase>(types.CreateUserLectureUseCase)
  .to(CreateUserLectureInteractor)

container.bind(TimetableController).to(TimetableController)

container
  .bind<GetTimetableUseCase>(types.GetTimetableUseCase)
  .to(GetTimetableInteractor)

container
  .bind<UpsertPeriodUseCase>(types.UpsertPeriodUseCae)
  .to(UpsertPeriodInteractor)

container
  .bind<RemovePeriodUseCase>(types.RemovePeriodUseCase)
  .to(RemovePeriodInteractor)

export default container
