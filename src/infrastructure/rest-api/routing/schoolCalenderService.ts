import { GET, Path, PathParam, QueryParam } from 'typescript-rest'
import {
  SchoolCalenderController,
  OutputSubstituteDay
} from '../../../interface/controller/schoolCalenderController'
import container from '../../../di/inversify.config'
import { OutputSchoolCalender } from '../../../interface/controller/schoolCalenderController'
import { Response, Tags } from 'typescript-rest-swagger'

@Path('/school-calender')
@Tags('学年暦')
export class SchoolCalenderService {
  schoolCalenderController: SchoolCalenderController

  constructor() {
    this.schoolCalenderController = container.get(SchoolCalenderController)
  }

  /**
   * 指定された年度の振替授業日一覧を取得する
   * @param year 年度
   */
  @Path('/substitutes/list')
  @GET
  @Response<OutputSubstituteDay[]>(200, '指定された年度の振替日一覧')
  getSubstituteDays(@QueryParam('year') year: number) {
    return this.schoolCalenderController.getSubstituteDays(year)
  }

  /**
   * 指定した日時のイベント、振替授業情報、モジュールを返す
   * @param date 2019-11-21 形式か今日('today')
   */
  @Path('/:date')
  @GET
  @Response<OutputSchoolCalender>(200, '指定日時の情報')
  getSchoolCalender(@PathParam('date') date: string) {
    return this.schoolCalenderController.getCalender(date)
  }
}
