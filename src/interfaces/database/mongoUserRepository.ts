import mongoose, { Schema, model as createModel } from 'mongoose'
import { UserData, User, Period } from '../../domain/entities/user'
import { injectable } from 'inversify'
import { UserRepository } from '../../application/repositories/userRepository'
import passport from 'passport'
import { Day, Module } from 'twinte-parser'

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
        day: { type: String, required: true },
        period: { type: Number, required: true },
        room: { type: String },
        lectureID: { type: String, required: true },
        name: { type: String, required: true },
        instructor: { type: String, required: true }
      }
    ]
  },
  userData: {
    type: [
      {
        year: { type: Number, required: true },
        lectureID: { type: String, required: true },
        memo: { type: String },
        attendance: { type: Number },
        absence: { type: Number },
        late: { type: Number }
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
      timetables: [],
      userData: []
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
  ): Promise<Period[] | null> {
    if (year && module) {
      const res = (await model.aggregate([
        { $match: { 'timetables.year': year, 'timetables.module': module } },
        { $unwind: '$timetables' },
        { $match: { 'timetables.year': year, 'timetables.module': module } },
        { $group: { _id: '$_id', timetables: { $push: '$timetables' } } }
      ]))[0] as unknown
      return (res as User).timetables
    } else if (year) {
      const res = (await model.aggregate([
        { $match: { 'timetables.year': year } },
        { $unwind: '$timetables' },
        { $match: { 'timetables.year': year } },
        { $group: { _id: '$_id', timetables: { $push: '$timetables' } } }
      ]))[0] as unknown
      return (res as User).timetables
    } else {
      const res = await model.findById(userID)
      return res ? res.timetables : null
    }
  }

  async getUserData(
    userID: string,
    lectureID: string,
    year: number
  ): Promise<UserData | null> {
    const res = await model.findById(userID, {
      userData: { $elemMatch: { year, lectureID } }
    })
    return res ? res.userData[0] : null
  }

  async updateTimetable(
    userID: string,
    period: Period
  ): Promise<Period | null> {
    const user = await model.findById(userID)
    if (!user) return null
    const index = user.timetables.findIndex(
      el =>
        el.year == period.year &&
        el.module == period.module &&
        el.day == period.day &&
        el.period == period.period
    )
    if (index > 0) user.timetables[index] = period
    else user.timetables.push(period)
    await user.save()

    return period
  }

  async removeTimetable(
    userID: string,
    year: number,
    module: Module,
    day: Day,
    period: number
  ): Promise<void> {
    const user = await model.findById(userID)
    if (!user) return
    const index = user.timetables.findIndex(
      el =>
        el.year == year &&
        el.module == module &&
        el.day == day &&
        el.period == period
    )
    if (index > 0) user.timetables.splice(index, 1)
    else return
    await user.save()

    return
  }

  async updateUserData(
    userID: string,
    userData: UserData
  ): Promise<UserData | null> {
    const user = await model.findById(userID)
    if (!user) return null
    const index = user.userData.findIndex(
      el => el.lectureID === userData.lectureID && el.year === userData.year
    )
    if (index > 0) user.userData[index] = userData
    else user.userData.push(userData)

    await user.save()
    return userData
  }
}
