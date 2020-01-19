import { Container } from 'inversify'
import { LectureRepository } from '../interface/repository/lectureRepository'
import { types } from './types'
import { PLectureRepository } from '../infrastructure/database/pLectureRepository'
import { RemoteLectureRepository } from '../interface/repository/remoteLectureRepository'
import { KdbRemoteLectureRepository } from '../infrastructure/database/kdbRemoteLectureRepository'
import { UpdateLectureDatabaseUseCase } from '../usecase/updateLectureDatabaseUseCase'
import { UpdateLectureDatabaseInteractor } from '../interactor/updateLectureDatabaseInteractor'
import { LectureController } from '../interface/controller/lectureController'
import { FindLectureUseCase } from '../usecase/findLectureUseCase'
import { FindLectureInteractor } from '../interactor/findLectureInteractor'
import { UserRepository } from '../interface/repository/userRepository'
import { PUserRepository } from '../infrastructure/database/pUserRepository'
import { CreateUserUseCase } from '../usecase/createUserUseCase'
import { CreateUserInteractor } from '../interactor/createUserInteractor'
import { LoginUseCase } from '../usecase/loginUseCase'
import { LoginInteractor } from '../interactor/loginInteractor'
import { UpsertAuthenticationUseCase } from '../usecase/upsertAuthenticationUseCase'
import { UpsertAuthenticationInteractor } from '../interactor/upsertAuthenticationInteractor'
import { TimetableRepository } from '../interface/repository/timetableRepository'
import { PTimetableRepository } from '../infrastructure/database/pTimetableRepository'
import { UserLectureRepository } from '../interface/repository/userLectureRepository'
import { PUserLectureRepository } from '../infrastructure/database/pUserLectureRepository'
import { CreateUserLectureUseCase } from '../usecase/createUserLectureUseCase'
import { CreateUserLectureInteractor } from '../interactor/createUserLectureInteractor'
import { TimetableController } from '../interface/controller/timetableController'
import { GetTimetableUseCase } from '../usecase/getTimetableUseCase'
import { GetTimetableInteractor } from '../interactor/getTimetableInteractor'
import { UpsertPeriodUseCase } from '../usecase/upsertPeriodUseCase'
import { UpsertPeriodInteractor } from '../interactor/upsertPeriodInteractor'
import { RemovePeriodUseCase } from '../usecase/removePeriodUseCase'
import { RemovePeriodInteractor } from '../interactor/removePeriodInteractor'
import { UserLectureController } from '../interface/controller/userLectureController'
import { FindUserLectureUseCase } from '../usecase/findUserLectureUseCase'
import { FindUserLectureInteractor } from '../interactor/findUserLectureInteractor'
import { UpdateUserLectureUseCase } from '../usecase/updateUserLectureUseCase'
import { UpdateUserLectureInteractor } from '../interactor/updateUserLectureInteractor'
import { SchoolCalenderRepository } from '../interface/repository/schoolCalenderRepository'
import { PSchoolCalenderRepository } from '../infrastructure/database/pSchoolCalenderRepository'
import { UpdateSchoolCalenderUseCase } from '../usecase/updateSchoolCalenderUseCase'
import { UpdateSchoolCalenderInteractor } from '../interactor/updateSchoolCalenderInteractor'
import { GetSchoolCalenderUseCase } from '../usecase/getSchoolCalenderUseCase'
import { GetSchoolCalenderInteractor } from '../interactor/getSchoolCalenderInteractor'
import { SchoolCalenderController } from '../interface/controller/schoolCalenderController'
import { RemoveUserLectureUseCase } from '../usecase/removeUserLectureUseCase'
import { RemoveUserLectureInteractor } from '../interactor/removeUserLectureInteractor'
import { CreateCheckoutSessionUseCase } from '../usecase/payment/createCheckoutSessionUseCase'
import { CreateCheckoutSessionInteractor } from '../interactor/payment/createCheckoutSessionInteractor'
import { FindPaymentUseCase } from '../usecase/payment/findPaymentUseCase'
import { FindPaymentInteractor } from '../interactor/payment/findPaymentInteractor'
import { UnsubscribeUseCase } from '../usecase/payment/unsubscribeUseCase'
import { UnsubscribeInteractor } from '../interactor/payment/unsubscribeInteractor'
import { PaymentController } from '../interface/controller/paymentController'
import { FindPaymentUserUseCase } from '../usecase/payment/findPaymentUserUseCase'
import { FindPaymentUserInteractor } from '../interactor/payment/findPaymentUserInteractor'
import { CreatePaymentUserUseCase } from '../usecase/payment/createPaymentUserUseCase'
import { CreatePaymentUserInteractor } from '../interactor/payment/createPaymentUserInteractor'
import { CheckoutSessionRepository } from '../interface/repository/payment/checkoutSessionRepository'
import { StripeCheckoutSessionRepository } from '../infrastructure/payment/StripeCheckoutSessionRepository'
import { PaymentUserRepository } from '../interface/repository/payment/paymentUserRepository'
import { PPaymentUserRepository } from '../infrastructure/payment/pPaymentUserRepository'
import { PaymentRepository } from '../interface/repository/payment/paymentRepository'
import { StripePaymentRepository } from '../infrastructure/payment/StripePaymentRepository'
import { SubscriptionRepository } from '../interface/repository/payment/subscriptionRepository'
import { StripeSubscriptionRepository } from '../infrastructure/payment/StripeSubscriptionRepository'
import { FindSubscriptionUseCase } from '../usecase/payment/findSubscriptionUseCase'
import { FindSubscriptionInteractor } from '../interactor/payment/findSubscriptionInteractor'
import { UpdatePaymentUserUseCase } from '../usecase/payment/updatePaymentUserUseCase'
import { UpdatePaymentUserInteractor } from '../interactor/payment/updatePaymentUserInteractor'
import { GetAllPaidUserUseCase } from '../interface/controller/getAllPaidUserUseCase'
import { GetAllPaidUserInteractor } from '../interactor/payment/GetAllPaidUserInteractor'

const container = new Container()

container
  .bind<LectureRepository>(types.LectureRepository)
  .to(PLectureRepository)
container
  .bind<RemoteLectureRepository>(types.RemoteLectureRepository)
  .to(KdbRemoteLectureRepository)
container
  .bind<UpdateLectureDatabaseUseCase>(types.UpdateLectureDatabaseUseCase)
  .to(UpdateLectureDatabaseInteractor)
container
  .bind<FindLectureUseCase>(types.FindLectureUseCase)
  .to(FindLectureInteractor)

container.bind<UserRepository>(types.UserRepository).to(PUserRepository)

container.bind(LectureController).to(LectureController)

container
  .bind<CreateUserUseCase>(types.CreateUserUserCase)
  .to(CreateUserInteractor)

container.bind<LoginUseCase>(types.LoginUseCase).to(LoginInteractor)

container
  .bind<UpsertAuthenticationUseCase>(types.UpsertAuthenticationUseCase)
  .to(UpsertAuthenticationInteractor)

container
  .bind<TimetableRepository>(types.TimetableRepository)
  .to(PTimetableRepository)

container
  .bind<UserLectureRepository>(types.UserLectureRepository)
  .to(PUserLectureRepository)

container
  .bind<CreateUserLectureUseCase>(types.CreateUserLectureUseCase)
  .to(CreateUserLectureInteractor)

container.bind(TimetableController).to(TimetableController)

container
  .bind<GetTimetableUseCase>(types.GetTimetableUseCase)
  .to(GetTimetableInteractor)

container
  .bind<UpsertPeriodUseCase>(types.UpsertPeriodUseCae)
  .to(UpsertPeriodInteractor)

container
  .bind<RemovePeriodUseCase>(types.RemovePeriodUseCase)
  .to(RemovePeriodInteractor)

container.bind(UserLectureController).to(UserLectureController)

container
  .bind<FindUserLectureUseCase>(types.FindUserLectureUseCase)
  .to(FindUserLectureInteractor)

container
  .bind<UpdateUserLectureUseCase>(types.UpdateUserLectureUseCase)
  .to(UpdateUserLectureInteractor)

container
  .bind<SchoolCalenderRepository>(types.SchoolCalenderRepository)
  .to(PSchoolCalenderRepository)

container
  .bind<UpdateSchoolCalenderUseCase>(types.UpdateSchoolCalenderUseCase)
  .to(UpdateSchoolCalenderInteractor)

container
  .bind<GetSchoolCalenderUseCase>(types.GetSchoolCalenderUseCase)
  .to(GetSchoolCalenderInteractor)

container.bind(SchoolCalenderController).to(SchoolCalenderController)

container
  .bind<RemoveUserLectureUseCase>(types.RemoveUserLectureUseCase)
  .to(RemoveUserLectureInteractor)

container
  .bind<CreateCheckoutSessionUseCase>(types.CreateCheckoutSessionUseCase)
  .to(CreateCheckoutSessionInteractor)

container
  .bind<FindPaymentUseCase>(types.FindPaymentUseCase)
  .to(FindPaymentInteractor)

container
  .bind<UnsubscribeUseCase>(types.UnsubscribeUseCase)
  .to(UnsubscribeInteractor)

container.bind(PaymentController).to(PaymentController)

container
  .bind<FindPaymentUserUseCase>(types.FindPaymentUserUseCase)
  .to(FindPaymentUserInteractor)

container
  .bind<CreatePaymentUserUseCase>(types.CreatePaymentUserUseCase)
  .to(CreatePaymentUserInteractor)

container
  .bind<CheckoutSessionRepository>(types.CheckoutSessionRepository)
  .to(StripeCheckoutSessionRepository)

container
  .bind<PaymentUserRepository>(types.PaymentUserRepository)
  .to(PPaymentUserRepository)

container
  .bind<PaymentRepository>(types.PaymentRepository)
  .to(StripePaymentRepository)

container
  .bind<SubscriptionRepository>(types.SubscriptionRepository)
  .to(StripeSubscriptionRepository)

container
  .bind<FindSubscriptionUseCase>(types.FindSubscriptionUseCase)
  .to(FindSubscriptionInteractor)

container
  .bind<UpdatePaymentUserUseCase>(types.UpdatePaymentUserUseCase)
  .to(UpdatePaymentUserInteractor)

container
  .bind<GetAllPaidUserUseCase>(types.GetAllPaidUserUseCase)
  .to(GetAllPaidUserInteractor)

export default container
