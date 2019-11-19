import {
  Context,
  GET,
  Path,
  PathParam,
  POST,
  ServiceContext
} from 'typescript-rest'
import { TimetableController } from '../../../interface/controller/timetableController'
import container from '../../../di/inversify.config'
import { Day, Module } from 'twinte-parser'

@Path('/timetables')
export class TimetableService {
  @Context
  context!: ServiceContext

  timetableController: TimetableController
  constructor() {
    this.timetableController = container.get(TimetableController)
  }

  @Path(':year')
  @POST
  registerLecture(
    @PathParam('year') year: number,
    params: { lectureCode: string }
  ) {
    return this.timetableController.registerLecture(
      this.context.request.user,
      year,
      params.lectureCode
    )
  }

  @Path(':year')
  @GET
  getYearTimetable(@PathParam('year') year: number) {
    return this.timetableController.getTimetable(
      this.context.request.user,
      year
    )
  }

  @Path(':year/:module')
  @GET
  getModuleTimetable(
    @PathParam('year') year: number,
    @PathParam('module') module: Module
  ) {
    return this.timetableController.getTimetable(
      this.context.request.user,
      year,
      module
    )
  }

  @Path(':year/:module/:day')
  @GET
  getDayTimetable(
    @PathParam('year') year: number,
    @PathParam('module') module: Module,
    @PathParam('day') day: Day
  ) {
    return this.timetableController.getTimetable(
      this.context.request.user,
      year,
      module,
      day
    )
  }
}
