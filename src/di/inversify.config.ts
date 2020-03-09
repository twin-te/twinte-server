import { types } from './types'
import { PLectureRepository } from '../infrastructure/database/pLectureRepository'
import { Container } from 'inversify'
import { KdbRemoteLectureRepository } from '../infrastructure/database/kdbRemoteLectureRepository'
import { UpdateLectureDatabaseInteractor } from '../interactor/updateLectureDatabaseInteractor'
import { FindLectureInteractor } from '../interactor/findLectureInteractor'
import { PUserRepository } from '../infrastructure/database/pUserRepository'
import { LectureController } from '../interface/controller/lectureController'
import { CreateUserInteractor } from '../interactor/createUserInteractor'
import { LoginInteractor } from '../interactor/loginInteractor'
import { UpsertAuthenticationInteractor } from '../interactor/upsertAuthenticationInteractor'
import { PTimetableRepository } from '../infrastructure/database/pTimetableRepository'
import { PUserLectureRepository } from '../infrastructure/database/pUserLectureRepository'
import { CreateUserLectureInteractor } from '../interactor/createUserLectureInteractor'
import { TimetableController } from '../interface/controller/timetableController'
import { GetTimetableInteractor } from '../interactor/getTimetableInteractor'
import { UpsertPeriodInteractor } from '../interactor/upsertPeriodInteractor'
import { RemovePeriodInteractor } from '../interactor/removePeriodInteractor'
import { UserLectureController } from '../interface/controller/userLectureController'
import { FindUserLectureInteractor } from '../interactor/findUserLectureInteractor'
import { UpdateUserLectureInteractor } from '../interactor/updateUserLectureInteractor'
import { PSchoolCalenderRepository } from '../infrastructure/database/pSchoolCalenderRepository'
import { UpdateSchoolCalenderInteractor } from '../interactor/updateSchoolCalenderInteractor'
import { GetSchoolCalenderInteractor } from '../interactor/getSchoolCalenderInteractor'
import { SchoolCalenderController } from '../interface/controller/schoolCalenderController'
import { RemoveUserLectureInteractor } from '../interactor/removeUserLectureInteractor'
import { CreateCheckoutSessionInteractor } from '../interactor/payment/createCheckoutSessionInteractor'
import { FindPaymentInteractor } from '../interactor/payment/findPaymentInteractor'
import { UnsubscribeInteractor } from '../interactor/payment/unsubscribeInteractor'
import { PaymentController } from '../interface/controller/paymentController'
import { FindPaymentUserInteractor } from '../interactor/payment/findPaymentUserInteractor'
import { CreatePaymentUserInteractor } from '../interactor/payment/createPaymentUserInteractor'
import { StripeCheckoutSessionRepository } from '../infrastructure/payment/StripeCheckoutSessionRepository'
import { PPaymentUserRepository } from '../infrastructure/payment/pPaymentUserRepository'
import { StripePaymentRepository } from '../infrastructure/payment/StripePaymentRepository'
import { StripeSubscriptionRepository } from '../infrastructure/payment/StripeSubscriptionRepository'
import { FindSubscriptionInteractor } from '../interactor/payment/findSubscriptionInteractor'
import { UpdatePaymentUserInteractor } from '../interactor/payment/updatePaymentUserInteractor'
import { GetAllPaidUserInteractor } from '../interactor/payment/GetAllPaidUserInteractor'
import { FindCheckoutInteractor } from '../interactor/payment/findCheckoutInteractor'
import { GetCheckoutInfoInteractor } from '../interactor/payment/getCheckoutInfoInteractor'

const config: { identifier: any; bindTo: any }[] = [
  { identifier: types.LectureRepository, bindTo: PLectureRepository },
  {
    identifier: types.RemoteLectureRepository,
    bindTo: KdbRemoteLectureRepository
  },
  {
    identifier: types.UpdateLectureDatabaseUseCase,
    bindTo: UpdateLectureDatabaseInteractor
  },
  {
    identifier: types.FindLectureUseCase,
    bindTo: FindLectureInteractor
  },
  { identifier: types.UserRepository, bindTo: PUserRepository },
  { identifier: LectureController, bindTo: LectureController },
  { identifier: types.CreateUserUserCase, bindTo: CreateUserInteractor },
  { identifier: types.LoginUseCase, bindTo: LoginInteractor },
  {
    identifier: types.UpsertAuthenticationUseCase,
    bindTo: UpsertAuthenticationInteractor
  },
  { identifier: types.TimetableRepository, bindTo: PTimetableRepository },
  { identifier: types.UserLectureRepository, bindTo: PUserLectureRepository },
  {
    identifier: types.CreateUserLectureUseCase,
    bindTo: CreateUserLectureInteractor
  },
  { identifier: TimetableController, bindTo: TimetableController },
  { identifier: types.GetTimetableUseCase, bindTo: GetTimetableInteractor },
  { identifier: types.UpsertPeriodUseCae, bindTo: UpsertPeriodInteractor },
  { identifier: types.RemovePeriodUseCase, bindTo: RemovePeriodInteractor },
  { identifier: UserLectureController, bindTo: UserLectureController },
  {
    identifier: types.FindUserLectureUseCase,
    bindTo: FindUserLectureInteractor
  },
  {
    identifier: types.UpdateUserLectureUseCase,
    bindTo: UpdateUserLectureInteractor
  },
  {
    identifier: types.SchoolCalenderRepository,
    bindTo: PSchoolCalenderRepository
  },
  {
    identifier: types.UpdateSchoolCalenderUseCase,
    bindTo: UpdateSchoolCalenderInteractor
  },
  {
    identifier: types.GetSchoolCalenderUseCase,
    bindTo: GetSchoolCalenderInteractor
  },
  { identifier: SchoolCalenderController, bindTo: SchoolCalenderController },
  {
    identifier: types.RemoveUserLectureUseCase,
    bindTo: RemoveUserLectureInteractor
  },
  {
    identifier: types.CreateCheckoutSessionUseCase,
    bindTo: CreateCheckoutSessionInteractor
  },
  { identifier: types.FindPaymentUseCase, bindTo: FindPaymentInteractor },
  { identifier: types.UnsubscribeUseCase, bindTo: UnsubscribeInteractor },
  { identifier: PaymentController, bindTo: PaymentController },
  {
    identifier: types.FindPaymentUserUseCase,
    bindTo: FindPaymentUserInteractor
  },
  {
    identifier: types.CreatePaymentUserUseCase,
    bindTo: CreatePaymentUserInteractor
  },
  {
    identifier: types.CheckoutSessionRepository,
    bindTo: StripeCheckoutSessionRepository
  },
  { identifier: types.PaymentUserRepository, bindTo: PPaymentUserRepository },
  { identifier: types.PaymentRepository, bindTo: StripePaymentRepository },
  {
    identifier: types.SubscriptionRepository,
    bindTo: StripeSubscriptionRepository
  },
  {
    identifier: types.FindSubscriptionUseCase,
    bindTo: FindSubscriptionInteractor
  },
  {
    identifier: types.UpdatePaymentUserUseCase,
    bindTo: UpdatePaymentUserInteractor
  },
  { identifier: types.GetAllPaidUserUseCase, bindTo: GetAllPaidUserInteractor },
  { identifier: types.FindCheckoutUseCase, bindTo: FindCheckoutInteractor },
  {
    identifier: types.GetCheckoutInfoUseCase,
    bindTo: GetCheckoutInfoInteractor
  }
]

const container = new Container()

export function configureDiContainer(identifiers?: any[]) {
  if (identifiers)
    identifiers.forEach(i => {
      container.bind(i).to(config.find(c => c.identifier === i)?.bindTo)
    })
  else config.forEach(c => container.bind(c.identifier).to(c.bindTo))
}

export default container
