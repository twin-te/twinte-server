import { inject, injectable } from 'inversify'
import { TYPES } from '../../inversifyTypes'
import { UserRepository } from '../repositories/userRepository'
import { UserData } from '../../domain/entities/user'

@injectable()
export class UserDataService {
  @inject(TYPES.UserRepository) private userRepository!: UserRepository

  async getUserData(userID: string, lectureID: string, year: number) {
    return this.userRepository.getUserData(userID, lectureID, year)
  }

  async updateUserData(userID: string, userData: UserData) {
    return this.userRepository.updateUserData(userID, userData)
  }
}
