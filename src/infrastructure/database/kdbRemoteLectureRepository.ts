import { RemoteLectureRepository } from '../../interface/repository/remoteLectureRepository'
import { LectureEntity } from '../../entity/lecture'
import { downloadKDB, parseKDB } from 'twinte-parser'
import { injectable } from 'inversify'

@injectable()
export class KdbRemoteLectureRepository implements RemoteLectureRepository {
  async fetchRemoteDatabase(year: number): Promise<LectureEntity[]> {
    const csv = await downloadKDB(year)
    const lectures = parseKDB(csv)

    return lectures.map(el => {
      const { year: standardYear, ...tmp } = el
      return {
        ...tmp,
        year,
        standardYear,
        twinte_lecture_id: ''
      }
    })
  }
}
