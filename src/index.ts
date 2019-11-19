import { connect } from './infrastructure/database'
import container from './di/inversify.config'
import { types } from './di/types'
import { UpdateLectureDatabaseUseCase } from './usecase/UpdateLectureDatabaseUseCase'

const main = async () => {
  await connect()
  console.log('connected')

  // const usecase = container.get<UpdateLectureDatabaseUseCase>(
  //   types.UpdateLectureDatabaseUseCase
  // )
  // await usecase.updateLectureDatabase(2019)

  const { startExpress } = await import('./infrastructure/rest-api')
  await startExpress()
}
main()
