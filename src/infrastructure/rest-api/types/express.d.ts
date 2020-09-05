import { UserEntity } from '../../../entity/user'
declare global {
  namespace Express {
    export interface User extends UserEntity {}
  }
}
