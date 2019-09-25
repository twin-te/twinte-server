import { Router } from 'express'
import container from '../../inversify.config'
import { TYPES } from '../../inversifyTypes'
import isAuthenticated from '../middleware/isAuthenticated'
import { UserDataService } from '../../application/services/UserDataService'
const router = Router()
const userDataService = container.get<UserDataService>(TYPES.UserDataService)

/**
 * @swagger
 * tags:
 *   - name: userdata
 *     description: ユーザーが講義ごとに持つメモ、出欠等のデータに関するAPI
 */

/**
 *  @swagger
 *  components:
 *    schemas:
 *      UserData:
 *        type: object
 *        properties:
 *          lectureID:
 *            type: string
 *          year:
 *            type: integer
 *          memo:
 *            type: string
 *          attendance:
 *            type: integer
 *          absence:
 *            type: integer
 *          late:
 *            type: integer
 */

router.use(isAuthenticated)

/**
 *  @swagger
 *  /userdata/{year}/{lectureID}:
 *    get:
 *      tags:
 *        - userdata
 *      summary: 指定した講義のユーザーデータを取得
 *      description: 指定した講義のユーザーデータを取得する
 *      parameters:
 *        - in: path
 *          name: year
 *          schema:
 *            type: integer
 *        - in: path
 *          name: lectureID
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: 成功
 *          schema:
 *           $ref: '#/components/schemas/UserData'
 *        401:
 *          description: 未ログイン
 *        500:
 *          description: 内部エラー
 */
router.get('/:year/:lectureID', async (req, res) => {
  res.json(
    await userDataService.getUserData(
      req.user!.id,
      req.params.lectureID,
      req.params.year
    )
  )
})

/**
 *  @swagger
 *  /userdata/{year}/{lectureID}:
 *    put:
 *      tags:
 *        - userdata
 *      summary: 指定した講義のユーザーデータを更新
 *      description: 指定した講義のユーザーデータを更新する
 *      parameters:
 *        - in: path
 *          name: year
 *          schema:
 *            type: integer
 *        - in: path
 *          name: lectureID
 *          schema:
 *            type: string
 *        - in: body
 *          name: body
 *          required: true
 *          schema:
 *            type: object
 *            properties:
 *              memo:
 *                type: string
 *              attendance:
 *                type: integer
 *              absence:
 *                type: integer
 *              late:
 *                type: integer
 *      responses:
 *        200:
 *          description: 成功
 *          schema:
 *           $ref: '#/components/schemas/UserData'
 *        401:
 *          description: 未ログイン
 *        500:
 *          description: 内部エラー
 */
router.put('/:year/:lectureID', async (req, res) => {
  res.json(
    await userDataService.updateUserData(req.user!.id, {
      ...req.body,
      year: req.params.year,
      lectureID: req.params.lectureID
    })
  )
})

export default router
