import { KdbRepository } from '../../application/repositories/kdbRepository'
import { downloadKDB, parseKDB } from 'twinte-parser'
import { Lecture } from '../../domain/entities/lecture'
import { injectable } from 'inversify'

@injectable()
export class TwinteParserKdbRepository implements KdbRepository {
  async getAllLecturesFromRemoteServer(year: number): Promise<Lecture[]> {
    const csv = await downloadKDB(year)
    return parseKDB(csv).map(el => ({
      ...el,
      year
    }))
  }
}
