import {
  Context,
  GET,
  Path,
  PathParam,
  POST,
  PreProcessor,
  PUT,
  ServiceContext
} from 'typescript-rest'
import { UserLectureController } from '../../../interface/controller/userLectureController'
import container from '../../../di/inversify.config'
import { UserLectureEntity } from '../../../entity/period'
import isAuthenticated from '../middleware/isAuthenticated'
import { Response, Tags } from 'typescript-rest-swagger'
import { NotFoundError } from 'typescript-rest/dist/server/model/errors'

@Path('/user-lectures')
@PreProcessor(isAuthenticated)
@Tags('ユーザー講義')
@Response(401, '未認証')
export class UserLectureService {
  @Context
  context!: ServiceContext

  userLectureController: UserLectureController

  constructor() {
    this.userLectureController = container.get(UserLectureController)
  }

  /**
   * ユーザー独自の講義を作成する
   * @param params
   */
  @Path('/')
  @POST
  @Response<UserLectureEntity>(200, '作成されたユーザー講義')
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

  /**
   * ユーザー講義の情報を取得する
   * @param user_lecture_id ユーザー講義のID
   */
  @Path(':user_lecture_id')
  @GET
  @Response<UserLectureEntity>(200, 'ユーザー講義の情報')
  @Response(404, '指定されたユーザー講義は存在しません')
  findUserLecture(@PathParam('user_lecture_id') user_lecture_id: string) {
    const result = this.userLectureController.findUserLecture(
      this.context.request.user,
      user_lecture_id
    )
    if (result) return result
    else throw new NotFoundError('指定されたユーザー講義は存在しません')
  }

  /**
   * ユーザー講義の情報を更新する
   * @param user_lecture_id 更新するユーザー講義ID
   * @param userLecture 更新情報
   */
  @Path(':user_lecture_id')
  @PUT
  @Response<UserLectureEntity>(200, '更新されたユーザ講義情報')
  @Response(404, '指定されたユーザー講義は存在しません')
  updateUserLecture(
    @PathParam('user_lecture_id') user_lecture_id: string,
    userLecture: UserLectureEntity
  ) {
    userLecture.user_lecture_id = user_lecture_id
    const result = this.userLectureController.updateUserLecture(
      this.context.request.user,
      userLecture
    )
    if (!result) throw new NotFoundError('指定されたユーザー講義は存在しません')
    else return result
  }
}
