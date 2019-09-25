import { inject, injectable } from 'inversify'
import { TYPES } from '../../inversifyTypes'
import { UserRepository } from '../repositories/userRepository'
import { Period, User } from '../../domain/entities/user'
import * as passport from 'passport'
import { LectureRepository } from '../repositories/lectureRepository'

@injectable()
export class UserService {
  @inject(TYPES.UserRepository) private userRepository!: UserRepository
  @inject(TYPES.LectureRepository) private lectureRepository!: LectureRepository

  async findByID(id: string): Promise<User | null> {
    return this.userRepository.findByID(id)
  }
  async findByTwitterID(id: string): Promise<User | null> {
    return this.userRepository.findByTwitterID(id)
  }
  async createUserByTwitter(profile: passport.Profile): Promise<User> {
    return this.userRepository.createUserByTwitter(profile)
  }

}
