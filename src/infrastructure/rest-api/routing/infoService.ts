import {
  DELETE,
  GET,
  Path,
  PathParam,
  POST,
  PreProcessor,
  PUT,
  QueryParam
} from 'typescript-rest'
import { Tags } from 'typescript-rest-swagger'
import {
  InfoController,
  OutputInformationData
} from '../../../interface/controller/infoController'
import { inject } from 'inversify'
import { ForbiddenError } from 'typescript-rest/dist/server/model/errors'
import container from '../../../di/inversify.config'

@Path('/information')
@Tags('お知らせ')
export class PublicInformationService {
  controller: InfoController
  constructor() {
    this.controller = container.get(InfoController)
  }

  /**
   * 運営からのお知らせを取得する
   * @param limit 取得する数
   * @param offset オフセット
   */
  @Path('/')
  @GET
  getInformation(
    @QueryParam('limit') limit: number,
    @QueryParam('offset') offset: number
  ): Promise<OutputInformationData[]> {
    return this.controller.findInfo(false, limit, offset)
  }
}

@Path('/internal-information')
@Tags('お知らせ（管理者用）')
@PreProcessor(req => {
  if (req.user?.twinte_user_id !== process.env.ADMIN_USER_ID) {
    throw new ForbiddenError()
  }
})
export class InternalInformationService {
  @inject(InfoController)
  controller: InfoController
  constructor() {
    this.controller = container.get(InfoController)
  }

  @Path('/')
  @POST
  create(body: {
    title: string
    content: string
    date: string
  }): Promise<OutputInformationData> {
    return this.controller.createInfo(body.title, body.content, body.date)
  }

  @Path('/')
  @GET
  list(
    @QueryParam('limit') limit: number,
    @QueryParam('offset') offset: number
  ): Promise<OutputInformationData[]> {
    return this.controller.findInfo(true, limit, offset)
  }

  @Path('/:info_id')
  @PUT
  update(
    @PathParam('info_id') id: string,
    body: { title: string; content: string; date: string }
  ): Promise<OutputInformationData> {
    return this.controller.updateInfo(id, body.title, body.content, body.date)
  }

  @Path('/:info_id')
  @DELETE
  async delete(@PathParam('info_id') id: string) {
    await this.controller.deleteInfo(id)
  }
}
