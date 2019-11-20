import {
  Context,
  GET,
  Path,
  PathParam,
  POST,
  PUT,
  ServiceContext
} from 'typescript-rest'
import { UserLectureController } from '../../../interface/controller/userLectureController'
import container from '../../../di/inversify.config'
import { UserLectureEntity } from '../../../entity/period'

@Path('/user-lecture')
export class UserLectureService {
  @Context
  context!: ServiceContext

  userLectureController: UserLectureController

  constructor() {
    this.userLectureController = container.get(UserLectureController)
  }

  @Path('/')
  @POST
  registerCustomUserLecture(params: {
    year: number
    lecture_name: string
    instructor: string
  }) {
    return this.userLectureController.createCustomUserLecture(
      this.context.request.user,
      params.year,
      params.lecture_name,
      params.instructor
    )
  }

  @Path(':user_lecture_id')
  @GET
  findUserLecture(@PathParam('user_lecture_id') user_lecture_id: string) {
    return this.userLectureController.findUserLecture(
      this.context.request.user,
      user_lecture_id
    )
  }

  @Path(':user_lecture_id')
  @PUT
  updateUserLecture(
    @PathParam('user_lecture_id') user_lecture_id: string,
    userLecture: UserLectureEntity
  ) {
    return this.userLectureController.updateUserLecture(
      this.context.request.user,
      userLecture
    )
  }
}
