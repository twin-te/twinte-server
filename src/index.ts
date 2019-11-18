import container from './di/inversify.config'
import { UpdateLectureDatabaseUseCase } from './usecase/UpdateLectureDatabaseUseCase'
import { types } from './di/types'
import { connect } from './infrastructure/database'

const main = async () => {
  await connect()
  const usecase = container.get<UpdateLectureDatabaseUseCase>(
    types.UpdateLectureDatabaseUseCase
  )
  await usecase.updateLectureDatabase(2019)
}
main()
