import { Connection, createConnection } from 'typeorm'
import { Lecture } from './orm/lecture'
import { LectureDate } from './orm/lectureDate'
import { User } from './orm/user'
import { UserAuthentication } from './orm/userAuthentication'
import { Period } from './orm/period'
import { UserLecture } from './orm/userLecture'
import {ModuleTerm} from './orm/moduleTerm'
import {SchoolEvent} from './orm/schoolEvent'
import {SubstituteDay} from './orm/substituteDay'

let con: Connection

export async function connect(): Promise<Connection> {
  if (!con)
    con = await createConnection({
      type: 'postgres',
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE,
      entities: [
        Lecture,
        LectureDate,
        User,
        UserAuthentication,
        Period,
        UserLecture,
        ModuleTerm,
        SchoolEvent,
        SubstituteDay
      ],
      synchronize: true,
      logging: false
    })

  return con
}

export function getConnection() {
  return con
}
