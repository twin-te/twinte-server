import {Context, DELETE, GET, PATCH, Path, PathParam, POST, PreProcessor, ServiceContext} from 'typescript-rest'
import {PaymentController} from '../../../interface/controller/paymentController'
import container from '../../../di/inversify.config'
import isAuthenticated from '../middleware/isAuthenticated'
import {Tags} from 'typescript-rest-swagger'

@Path('/payment')
@Tags('寄付決済に関するAPI')
@PreProcessor(isAuthenticated)
export class PaymentService {

  @Context
  context!: ServiceContext

  paymentController: PaymentController

  constructor() {
    this.paymentController = container.get(PaymentController)
  }

  @Path('/checkout-session/onetime')
  @POST
  async createOneTimeCheckoutSession(params: {amount: number }) {
    return {
      sessionId: await this.paymentController.createOneTimeCheckoutSession(params.amount, this.context.request.user)
    }
  }

  @Path('/checkout-session/subscription')
  @POST
  async createSubscriptionCheckoutSession(params: {plan_id  : string }) {
    return {
      sessionId: await this.paymentController.createSubscriptionCheckoutSession(params.plan_id, this.context.request.user)
    }
  }

  @Path('/success')
  @GET
  success() {
    return 'success'
  }

  @Path('/cancel')
  @GET
  cancel() {
    return 'cancel'
  }

  @Path('/')
  @GET
  getUserPayments() {
    return this.paymentController.findPaymentByPaymentUser(this.context.request.user)
  }

  @Path('/subscriptions')
  @GET
  getSubscriptions() {
    return this.paymentController.findSubscriptionByPaymentUser(this.context.request.user)
  }

  @Path('/users/:id')
  @PATCH
  updatePaymentUser(params: {nickname:string | null , link: string | null }) {
    return this.paymentController.updatePaymentUser(this.context.request.user, params)
  }

  @Path('/subscriptions/:id')
  @DELETE
  async unsubscribe(@PathParam('id')subscription_id: string) {
    await this.paymentController.unsubscribe(subscription_id)
  }
}

@Path('/payment')
@Tags('寄付決済に関するAPI')
export class _PaymentService {

  paymentController: PaymentController

  constructor() {
    this.paymentController = container.get(PaymentController)
  }

  @Path('/totalAmount')
  @GET
  async getTotalAmount() {
    return {
      total: await this.paymentController.getTotalPaymentAmount()
    }
  }


  @Path('/users')
  @GET
  getPaidUsers() {
    return this.paymentController.getAllPaidUsers()
  }
}
