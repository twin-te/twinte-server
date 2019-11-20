import { connect } from './infrastructure/database'
import envCheck from './envCheck'

envCheck()

const main = async () => {
  await connect()
  console.log('connected')
  const { startExpress } = await import('./infrastructure/rest-api')
  await startExpress()
}
main()
