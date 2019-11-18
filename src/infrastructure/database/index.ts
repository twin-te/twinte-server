import { Connection, createConnection } from 'typeorm'
import { Lecture } from './lecture'
import { LectureDate } from './lectureDate'

let con: Connection

export async function connect(): Promise<Connection> {
  if (!con)
    con = await createConnection({
      type: 'postgres',
      host: '192.168.99.100',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'twin_te',
      entities: [Lecture, LectureDate],
      synchronize: true,
      logging: false
    })

  return con
}

export function getConnection() {
  return con
}
