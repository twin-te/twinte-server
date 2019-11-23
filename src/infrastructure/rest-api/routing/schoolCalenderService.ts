import { GET, Path, PathParam } from 'typescript-rest'
import { SchoolCalenderController } from '../../../interface/controller/schoolCalenderController'
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
