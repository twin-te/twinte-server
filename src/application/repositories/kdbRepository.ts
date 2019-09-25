import { Lecture } from '../../domain/entities/lecture'

/**
 * KDBの情報を取得するレポジトリ
 */
export interface KdbRepository {
  /**
   * 最新のKDBの情報を取得する
   * @param year 年度
   */
  getAllLecturesFromRemoteServer(year: number): Promise<Lecture[]>
}
