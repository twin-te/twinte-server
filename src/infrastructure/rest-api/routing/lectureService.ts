import { GET, Path, QueryParam } from 'typescript-rest'
import { LectureController } from '../../../interface/controller/lectureController'
import container from '../../../di/inversify.config'
import { Response, Tags } from 'typescript-rest-swagger'
import { LectureEntity } from '../../../entity/lecture'

@Path('/lectures')
@Tags('講義情報')
export class LectureService {
  lectureController: LectureController
  constructor() {
    this.lectureController = container.get(LectureController)
  }

  @Path('/search')
  @Response<LectureEntity[]>(200, '検索結果')
  @GET
  lectureFromKeyword(
    @QueryParam('q') q: string,
    @QueryParam('year') year: number
  ) {
    return this.lectureController.searchByKeyword(year, q)
  }
}
