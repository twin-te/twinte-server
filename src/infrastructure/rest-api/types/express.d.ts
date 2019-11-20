import { UserEntity } from '../../../entity/user'
declare module 'express' {
  interface User extends UserEntity {}
}
