import { Connection, createConnection } from 'typeorm'
import { Lecture } from './orm/lecture'
import { LectureDate } from './orm/lectureDate'
import { User } from './orm/user'
import { UserAuthentication } from './orm/userAuthentication'

let con: Connection

export async function connect(): Promise<Connection> {
  if (!con)
    con = await createConnection({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'twin_te',
      entities: [Lecture, LectureDate, User, UserAuthentication],
      synchronize: true,
      logging: false
    })

  return con
}

export function getConnection() {
  return con
}
