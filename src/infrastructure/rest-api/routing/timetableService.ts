import {
  Context,
  DELETE,
  GET,
  Path,
  PathParam,
  POST,
  PreProcessor,
  PUT,
  QueryParam,
  ServiceContext
} from 'typescript-rest'
import { TimetableController } from '../../../interface/controller/timetableController'
import container from '../../../di/inversify.config'
import { Day, Module } from 'twinte-parser'
import { PeriodEntity, UserLectureEntity } from '../../../entity/period'
import { Response, Tags } from 'typescript-rest-swagger'
import isAuthenticated from '../middleware/isAuthenticated'
import { BadRequestError } from 'typescript-rest/dist/server/model/errors'

@Path('/timetables')
@PreProcessor(isAuthenticated)
@Tags('時間割')
@Response(401, '未認証')
export class TimetableService {
  @Context
  context!: ServiceContext

  timetableController: TimetableController
  constructor() {
    this.timetableController = container.get(TimetableController)
  }

  /**
   * 講義を時間割に登録する
   * (自動でそれに対応するユーザー講義オブジェクトも生成される)
   * @param params 登録する講義
   */
  @POST
  @Response<UserLectureEntity>(
    200,
    '登録に伴って生成されたユーザー講義オブジェクト'
  )
  @Response(401, '未認証')
  registerLecture(params: { year: number; lectureCode: string }) {
    return this.timetableController.registerLecture(
      this.context.request.user,
      params.year,
      params.lectureCode
    )
  }

  /**
   * 時間割を取得する
   * @param year 実施年度
   * @param module 実施モジュール
   * @param day 実施曜日
   */
  @Path('/')
  @GET
  @Response<PeriodEntity[]>(200, '時間割')
  getTimetable(
    @QueryParam('year') year?: number,
    @QueryParam('module') module?: Module,
    @QueryParam('day') day?: Day
  ) {
    return this.timetableController.getTimetable(
      this.context.request.user,
      year,
      module,
      day
    )
  }

  /**
   * 1コマを追加/更新する
   * @param params user_lecture_idはこのコマがどの講義に紐付いているかを示す。
   * ユーザーが独自に講義を作成する場合は、事前にユーザー講義を作成しておく必要がある
   */
  @Path('/')
  @Response<PeriodEntity>(200, '作成/更新されたコマ情報')
  @PUT
  upsertPeriod(params: PeriodEntity) {
    return this.timetableController.upsertPeriod(
      this.context.request.user,
      params
    )
  }

  /**
   * 1コマを削除する
   * 指定されたコマを削除するだけで、講義すべてのコマが削除されるわけではない。
   * @param params
   */
  @Path('period')
  @Response(200, '成功')
  @Response(400, '指定されたコマが存在しません')
  @DELETE
  removePeriod(params: PeriodEntity) {
    const res = this.timetableController.removePeriod(
      this.context.request.user,
      params
    )
    if (res) return
    else throw new BadRequestError('指定されたコマは存在しません')
  }
}
