import {Context, DELETE, GET, PATCH, Path, PathParam, POST, PreProcessor, ServiceContext} from 'typescript-rest'
import {PaymentController} from '../../../interface/controller/paymentController'
import container from '../../../di/inversify.config'
import isAuthenticated from '../middleware/isAuthenticated'
import {Tags, Response} from 'typescript-rest-swagger'
import {Payment} from '../../../entity/payment/payment'
import {Subscription} from '../../../entity/payment/subscription'
import {PaymentUser} from '../../../entity/payment/paymentUser'

@Path('/payment')
@Tags('寄付決済に関するAPI')
@PreProcessor(isAuthenticated)
@Response(401, '未認証')
export class PaymentService {

  @Context
  context!: ServiceContext

  paymentController: PaymentController

  constructor() {
    this.paymentController = container.get(PaymentController)
  }

  /**
   * 単発寄付するためのセッションを取得
   * @param params 寄付額
   */
  @Path('/checkout-session/onetime')
  @POST
  @Response<{sessionId: string}>(200, '生成されたセッションID')
  async createOneTimeCheckoutSession(params: {amount: number }) {
    return {
      sessionId: await this.paymentController.createOneTimeCheckoutSession(params.amount, this.context.request.user)
    }
  }

  /**
   * 継続寄付を開始するためのセッションを取得
   * @param params
   */
  @Path('/checkout-session/subscription')
  @POST
  @Response<{sessionId: string}>(200, '生成されたセッションID')
  async createSubscriptionCheckoutSession(params: {plan_id  : string }) {
    return {
      sessionId: await this.paymentController.createSubscriptionCheckoutSession(params.plan_id, this.context.request.user)
    }
  }

  /**
   * サブスク、単発問わず発生した請求一覧を取得
   */
  @Path('/')
  @GET
  @Response<Payment[]>(200, '支払い一覧')
  getUserPayments() {
    return this.paymentController.findPaymentByPaymentUser(this.context.request.user)
  }

  /**
   * 登録しているサブスク一覧を取得
   */
  @Path('/subscriptions')
  @GET
  @Response<Subscription[]>(200, 'サブスク一覧')
  getSubscriptions() {
    return this.paymentController.findSubscriptionByPaymentUser(this.context.request.user)
  }

  /**
   * 支払いユーザーをアップデート
   * @param params 更新内容
   */
  @Path('/users/:id')
  @PATCH
  @Response<PaymentUser>(200, '更新したユーザー')
  updatePaymentUser(params: {nickname:string | null , link: string | null }) {
    return this.paymentController.updatePaymentUser(this.context.request.user, params)
  }

  /**
   * サブスク解除
   * @param subscription_id 解除したいサブスクID
   */
  @Path('/subscriptions/:id')
  @DELETE
  @Response<{result: boolean}>(200, '生成されたセッションID')
  async unsubscribe(@PathParam('id')subscription_id: string) {
    await this.paymentController.unsubscribe(subscription_id)
    return {
      result: true
    }
  }

  /**
   * 支払い後のリダイレクト先（仮）
   */
  @Path('/success')
  @GET
  success() {
    return 'success'
  }

  /**
   * キャンセル時のリダイレクト先？（仮）
   */
  @Path('/cancel')
  @GET
  cancel() {
    return 'cancel'
  }
}

@Path('/payment')
@Tags('寄付決済に関するAPI')
export class _PaymentService {

  paymentController: PaymentController

  constructor() {
    this.paymentController = container.get(PaymentController)
  }

  /**
   * 現在の寄付総額額を取得
   * 重い
   */
  @Path('/totalAmount')
  @GET
  async getTotalAmount() {
    return {
      total: await this.paymentController.getTotalPaymentAmount()
    }
  }

  /**
   * 寄付してくれたユーザーで掲載OKのユーザー一覧を取得
   * 重い
   */
  @Path('/users')
  @GET
  getPaidUsers() {
    return this.paymentController.getAllPaidUsers()
  }
}
