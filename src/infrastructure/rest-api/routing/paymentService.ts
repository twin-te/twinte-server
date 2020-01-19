import {Context, DELETE, GET, Path, POST, PreProcessor, ServiceContext} from 'typescript-rest'
import {PaymentController} from '../../../interface/controller/paymentController'
import container from '../../../di/inversify.config'
import isAuthenticated from '../middleware/isAuthenticated'

@Path('/payment')
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
  async createOneTimeCheckoutSession(body: {amount: number }) {
    return {
      sessionId: await this.paymentController.createOneTimeCheckoutSession(body.amount, this.context.request.user)
    }
  }

  @Path('/checkout-session/subscription')
  @POST
  async createSubscriptionCheckoutSession(body: {plan_id  : string }) {
    return {
      sessionId: await this.paymentController.createSubscriptionCheckoutSession(body.plan_id, this.context.request.user)
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

  @Path('/subscriptions/:id')
  @DELETE
  async unsubscribe(body: {subscription_id: string}) {
    await this.paymentController.unsubscribe(body.subscription_id)
  }
}

@Path('/payment')
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
}
