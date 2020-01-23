import envCheck from '../src/envCheck'
// @ts-ignore
import pgtools from 'pgtools'
import { connect } from '../src/infrastructure/database'
import { Connection } from 'typeorm'

const config = {
  host: process.env.PG_HOST,
  port: Number(process.env.PG_PORT),
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD
}

let databaseConnection: Connection

export async function initRepository() {
  jest.setTimeout(10000)
  envCheck(['Database'])
  try {
    await pgtools.dropdb(config, process.env.PG_DATABASE)
  } catch (e) {}

  await pgtools.createdb(config, process.env.PG_DATABASE)
  databaseConnection = await connect()
}

export async function clearDatabase() {
  await databaseConnection.close()
  await pgtools.dropdb(config, process.env.PG_DATABASE)
}
