import { Router } from 'express'
import isAuthenticated from '../middleware/isAuthenticated'
const router = Router()
import container from '../../inversify.config'
import { UserService } from '../../application/services/UserService'
import { TYPES } from '../../inversifyTypes'

const userService = container.get<UserService>(TYPES.UserService)

/**
 * @swagger
 * tags:
 *   - name: user
 *     description: ユーザーに関するAPI
 */

/**
 *  @swagger
 *  /users/me:
 *    get:
 *      tags:
 *        - user
 *      summary: ログインユーザーの情報を取得
 *      description: ログインユーザーの情報を取得
 *      responses:
 *        200:
 *          description: 成功
 *          schema:
 *            type: object
 *            properties:
 *              _id:
 *                type: string
 *              twitter:
 *                type: object
 *        401:
 *          description: 未ログイン
 *        500:
 *          description: 内部エラー
 */
router.get('/me', isAuthenticated, async (req, res) => {
  try {
    const data = await userService.findByID(req.user!.id)
    if (data)
      res.json({
        // @ts-ignore
        id: data._id,
        twitter: data.twitter
      })
    else res.json({})
  } catch (e) {
    console.error(e)
    res.sendStatus(500)
  }
})

export default router
