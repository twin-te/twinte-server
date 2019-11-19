// import container from './di/inversify.config'
// import { UpdateLectureDatabaseUseCase } from './usecase/UpdateLectureDatabaseUseCase'
// import { types } from './di/types'
import { connect } from './infrastructure/database'
import { startExpress } from './infrastructure/rest-api'
import container from './di/inversify.config'
import { CreateUserUseCase } from './usecase/createUserUseCase'
import { types } from './di/types'
import { AuthenticationProvider } from './entity/user'

const main = async () => {
  await connect()
  const usecase = container.get<CreateUserUseCase>(types.CreateUserUserCase)
  const user = await usecase.createUser({
    social_id: 'hpge',
    social_username: 'user',
    social_display_name: 'nyaan',
    provider: AuthenticationProvider.Twitter
  })
  startExpress()
}
main()
