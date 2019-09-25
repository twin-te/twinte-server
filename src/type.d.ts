import { _User } from './domain/entities/user'
import { User } from 'express'
declare global {
  namespace Express {
    export interface User extends _User {
      id: string
    }
  }
}
