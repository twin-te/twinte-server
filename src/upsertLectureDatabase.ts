import container from './di/inversify.config'
import { types } from './di/types'
import { UpdateLectureDatabaseUseCase } from './usecase/UpdateLectureDatabaseUseCase'
import { connect } from './infrastructure/database'

import envCheck from './envCheck'
envCheck(['Database'])

const main = async () => {
  await connect()
  console.log('connected')
  const usecase = container.get<UpdateLectureDatabaseUseCase>(
    types.UpdateLectureDatabaseUseCase
  )
  await usecase.updateLectureDatabase(2019)
}
main()
