import {Container} from 'inversify'
import {LectureRepository} from '../interface/repository/lectureRepository'
import {types} from './types'
import {PLectureRepository} from '../infrastructure/database/pLectureRepository'
import {RemoteLectureRepository} from '../interface/repository/remoteLectureRepository'
import {KdbRemoteLectureRepository} from '../infrastructure/database/kdbRemoteLectureRepository'
import {UpdateLectureDatabaseUseCase} from '../usecase/UpdateLectureDatabaseUseCase'
import {UpdateLectureDatabaseInteractor} from '../Interactor/UpdateLectureDatabaseInteractor'

const container = new Container()

container.bind<LectureRepository>(types.LectureRepository).to(PLectureRepository)
container.bind<RemoteLectureRepository>(types.RemoteLectureRepository).to(KdbRemoteLectureRepository)
container.bind<UpdateLectureDatabaseUseCase>(types.UpdateLectureDatabaseUseCase).to(UpdateLectureDatabaseInteractor)

export default container
