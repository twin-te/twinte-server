import { GET, Path, QueryParam } from 'typescript-rest'
import { LectureController } from '../../../interface/controller/lectureController'
import container from '../../../di/inversify.config'

@Path('/lectures')
export class LectureService {
  lectureController: LectureController
  constructor() {
    this.lectureController = container.get(LectureController)
  }

  @Path('/search')
  @GET
  lectureFromKeyword(@QueryParam('q') q: string) {
    return this.lectureController.searchByKeyword(q)
  }
}
