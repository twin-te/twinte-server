import { connect } from './infrastructure/database'

const main = async () => {
  await connect()
  console.log('connected')
  const { startExpress } = await import('./infrastructure/rest-api')
  await startExpress()
}
main()
