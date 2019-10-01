import { LectureRepository } from '../../application/repositories/lectureRepository'
import { Lecture } from '../../domain/entities/lecture'
import mongoose, { Schema, model as createModel } from 'mongoose'
import { injectable } from 'inversify'
import * as _cliProgress from 'cli-progress'

// @ts-ignore
mongoose.Schema.Types.String.checkRequired((v: string) => v != null)

export interface LectureDocument extends mongoose.Document, Lecture {}

const schema = new Schema({
  lectureID: { type: String, required: true, unique: true },
  year: { type: Number, required: true },
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
  instructor: { type: String, required: true }
})

const model = createModel<LectureDocument>('Kdb', schema)

@injectable()
export class MongoLectureRepository implements LectureRepository {
  async findByLectureID(
    lectureID: string,
    year: number
  ): Promise<Lecture | null> {
    return model.findOne({ lectureID, year })
  }

  async isEmpty(year: number): Promise<boolean> {
    return (await model.count({ year })) === 0
  }

  async searchByName(q: string, year: number): Promise<Lecture[]> {
    return model.find({ name: new RegExp(q), year })
  }

  async updateAll(lectures: Lecture[]): Promise<void> {
    const bar = new _cliProgress.Bar({}, _cliProgress.Presets.shades_classic)
    console.log('●  Updating Database')
    bar.start(lectures.length, 0)
    for (let i = 0; i < lectures.length; i++) {
      if (lectures[i].lectureID === '') return
      await model.findOneAndUpdate(
        { lectureID: lectures[i].lectureID, year: lectures[i].year },
        lectures[i],
        {
          upsert: true,
          runValidators: true
        }
      )
      bar.update(i)
    }
    bar.stop()
    console.log('✔  Done')
  }
}
