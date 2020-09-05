import { RemoteLectureRepository } from '../../interface/repository/remoteLectureRepository'
import { LectureEntity, LectureFormat } from '../../entity/lecture'
import { downloadKDB, parseKDB } from 'twinte-parser'
import { injectable } from 'inversify'

@injectable()
export class KdbRemoteLectureRepository implements RemoteLectureRepository {
  async fetchRemoteDatabase(year: number): Promise<LectureEntity[]> {
    const csv = await downloadKDB(year)
    const lectures = parseKDB(csv)

    return lectures.map(el => {
      const { year: standardYear, remarks, ...tmp } = el

      const formats: LectureFormat[] = []

      if (remarks.includes('オンデマンド'))
        formats.push(LectureFormat.OnlineAsynchronous)
      if (remarks.includes('同時双方向'))
        formats.push(LectureFormat.OnlineSynchronous)
      if (remarks.includes('対面')) formats.push(LectureFormat.FaceToFace)

      return {
        ...tmp,
        year,
        standardYear,
        formats,
        remarks,
        twinte_lecture_id: ''
      }
    })
  }
}
