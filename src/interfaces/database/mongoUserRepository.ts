import mongoose, { Schema, model as createModel } from 'mongoose'
import { UserLectureData, User } from '../../domain/entities/user'
import { injectable } from 'inversify'
import { UserRepository } from '../../application/repositories/userRepository'
import passport from 'passport'
import { Module } from 'twinte-parser'

mongoose.Schema.Types.String.checkRequired((v: string) => v != null)

export interface UserDocument extends mongoose.Document, User {}

const schema = new Schema({
  twitter: {
    type: {
      provider: { type: String, required: true },
      id: { type: String, required: true },
      displayName: { type: String, required: true },
      username: { type: String },
      photos: { type: Array }
    }
  },
  timetables: {
    type: [
      {
        year: { type: Number, required: true },
        module: { type: String, required: true },
        lectures: {
          type: [
            {
              name: { type: String, required: true },
              details: {
                type: [
                  {
                    module: { type: String, required: true },
                    day: { type: String, required: true },
                    period: { type: Number, required: true },
                    room: { type: String, required: true }
                  }
                ]
              },
              instructor: { type: String, required: true },
              memo: { type: String },
              attendance: { type: Number },
              absence: { type: Number },
              late: { type: Number }
            }
          ]
        }
      }
    ]
  }
})

const model = createModel<UserDocument>('User', schema)

@injectable()
export class MongoUserRepository implements UserRepository {
  async createUserByTwitter(profile: passport.Profile): Promise<User> {
    const newUser: User = {
      twitter: profile,
      timetables: []
    }
    return await new model(newUser).save()
  }

  async findByID(id: string): Promise<User | null> {
    return model.findById(id)
  }

  async findByTwitterID(id: string): Promise<User | null> {
    return model.findOne({ 'twitter.id': id })
  }

  async getTimetable(
    userID: string,
    year?: number,
    module?: Module
  ): Promise<UserLectureData[] | null> {
    const user = await model.findById(userID)
    if (user) {
      let timetable = user.timetables
      if (year) timetable = timetable.filter(el => el.year === year)
      if (module) timetable = timetable.filter(el => el.module === module)
      return timetable ? timetable : []
    } else return null
  }

  async updateTimetable(
    userID: string,
    year: number,
    timetable: UserLectureData[]
  ): Promise<UserLectureData[] | null> {
    const user = await model.findById(userID)
    if (user) {
      user.timetables[year] = timetable
      return timetable
    } else return null
  }
}
