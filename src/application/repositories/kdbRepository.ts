import { Lecture } from '../../domain/entities/lecture'

export interface KdbRepository {
  getAllLecturesFromRemoteServer(year: number): Promise<Lecture[]>
}
