import {
  Context,
  DELETE,
  GET,
  Path,
  PathParam,
  POST,
  PUT,
  ServiceContext
} from 'typescript-rest'
import { TimetableController } from '../../../interface/controller/timetableController'
import container from '../../../di/inversify.config'
import { Day, Module } from 'twinte-parser'
import { PeriodEntity } from '../../../entity/period'
import { Response } from 'typescript-rest-swagger'

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

  @Path('/')
  @PUT
  upsertPeriod(params: PeriodEntity) {
    return this.timetableController.upsertPeriod(
      this.context.request.user,
      params
    )
  }

  @Path('period')
  @DELETE
  removePeriod(params: PeriodEntity) {
    return this.timetableController.removePeriod(
      this.context.request.user,
      params
    )
  }
}
