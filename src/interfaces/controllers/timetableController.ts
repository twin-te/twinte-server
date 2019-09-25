import { Router } from 'express'
import container from '../../inversify.config'
import { TYPES } from '../../inversifyTypes'
import { TimetableService } from '../../application/services/TimetableService'
import isAuthenticated from '../middleware/isAuthenticated'
import { check } from 'express-validator'
import simpleValidator from '../middleware/simpleValidator'
const router = Router()
const timetableService = container.get<TimetableService>(TYPES.TimetableService)

router.use(isAuthenticated)

/**
 * @swagger
 * tags:
 *   - name: timetables
 *     description: ユーザーの時間割に関するAPI
 */

/**
 *  @swagger
 *  components:
 *    schemas:
 *      Period:
 *        type: object
 *        properties:
 *          year:
 *            type: integer
 *          module:
 *            type: string
 *          day:
 *            type: string
 *          period:
 *            type: integer
 *          room:
 *            type: string
 *          lectureID:
 *            type: string
 *          name:
 *            type: string
 *          instructor:
 *            type: string
 */

/**
 *  @swagger
 *  /timetables/{year}/{module}:
 *    get:
 *      tags:
 *        - timetables
 *      summary: 時間割取得
 *      description: 指定された時間割を返す
 *      parameters:
 *        - in: path
 *          name: year
 *          schema:
 *            type: integer
 *          description: 年度
 *        - in: path
 *          name: module
 *          schema:
 *            type: string
 *          description: モジュール
 *
 *      responses:
 *        200:
 *          description: 成功
 *          schema:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/Period'
 *        401:
 *          description: 未ログイン
 *        500:
 *          description: 内部エラー
 */
router.get('/:year/:module', async (req, res) => {
  res.json(
    await timetableService.getTimetable(
      req.user!.id,
      Number(req.params.year),
      req.params.module
    )
  )
})

/**
 *  @swagger
 *  /timetables/{year}:
 *    get:
 *      tags:
 *        - timetables
 *      summary: 時間割取得
 *      description: 指定された時間割を返す
 *      parameters:
 *        - in: path
 *          name: year
 *          schema:
 *            type: integer
 *          description: 年度
 *
 *      responses:
 *        200:
 *          description: 成功
 *          schema:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/Period'
 *        401:
 *          description: 未ログイン
 *        500:
 *          description: 内部エラー
 */
router.get('/:year', async (req, res) => {
  res.json(
    await timetableService.getTimetable(req.user!.id, Number(req.params.year))
  )
})

/**
 *  @swagger
 *  /timetables:
 *    post:
 *      tags:
 *        - timetables
 *      summary: 講義を時間割に登録
 *      description: 講義IDから時間割に自動登録する
 *      parameters:
 *      - in: body
 *        name: body
 *        description: 登録する講義に関する情報
 *        required: true
 *        schema:
 *          type: object
 *          properties:
 *            year:
 *              type: integer
 *            lectureID:
 *              type: string
 *
 *      responses:
 *        200:
 *          description: 成功
 *          schema:
 *            type: object
 *            properties:
 *              msg:
 *                type: string
 *        401:
 *          description: 未ログイン
 *        422:
 *          description: パラメータ不足
 *          schema:
 *            $ref: '#/components/schemas/Error'
 *        500:
 *          description: 内部エラー
 */
router.post(
  '/',
  check('lectureID').isString(),
  check('year').isNumeric(),
  simpleValidator,
  async (req, res) => {
    req.user
    await timetableService.updatePeriodByLectureID(
      req.user!.id,
      req.body.lectureID,
      req.body.year
    )
    res.json({ msg: 'ok' })
  }
)

/**
 *  @swagger
 *  /timetables/{year}/{module}/{day}/{period}:
 *    put:
 *      tags:
 *        - timetables
 *      summary: 講義の作成/更新
 *      description: 指定された時限を新しいデータで更新する
 *      parameters:
 *      - in: path
 *        name: year
 *        schema:
 *          type: integer
 *      - in: path
 *        name: module
 *        schema:
 *          type: string
 *      - in: path
 *        name: day
 *        schema:
 *          type: string
 *      - in: path
 *        name: period
 *        schema:
 *          type: integer
 *      - in: body
 *        name: body
 *        description: 講義のカスタム情報
 *        required: true
 *        schema:
 *          type: object
 *          properties:
 *            lectureID:
 *              type: string
 *            name:
 *              type: string
 *            instructor:
 *              type: string
 *            room:
 *              type: string
 *
 *      responses:
 *        200:
 *          description: 成功
 *          schema:
 *            type: object
 *            properties:
 *              msg:
 *                type: string
 *        401:
 *          description: 未ログイン
 *        422:
 *          description: パラメータ不足
 *          schema:
 *            $ref: '#/components/schemas/Error'
 *        500:
 *          description: 内部エラー
 */
router.put('/:year/:module/:day/:period', async (req, res) => {
  await timetableService.updatePeriodByCustomData(req.user!.id, {
    year: req.params.year,
    module: req.params.module,
    day: req.params.day,
    period: req.params.period,
    ...req.body
  })
  res.json({ msg: 'ok' })
})

/**
 *  @swagger
 *  /timetables/{year}/{module}/{day}/{period}:
 *    delete:
 *      tags:
 *        - timetables
 *      summary: 講義の削除
 *      description: 指定された時限を削除する。
 *      parameters:
 *      - in: path
 *        name: year
 *        schema:
 *          type: integer
 *      - in: path
 *        name: module
 *        schema:
 *          type: string
 *      - in: path
 *        name: day
 *        schema:
 *          type: string
 *      - in: path
 *        name: period
 *        schema:
 *          type: integer
 *
 *      responses:
 *        200:
 *          description: 成功
 *          schema:
 *            type: object
 *            properties:
 *              msg:
 *                type: string
 *        401:
 *          description: 未ログイン
 *        500:
 *          description: 内部エラー
 */
router.delete('/:year/:module/:day/:period', async (req, res) => {
  await timetableService.removePeriod(
    req.user!.id,
    req.params.year,
    req.params.module,
    req.params.day,
    req.params.period
  )
  res.json({ msg: 'ok' })
})

export default router
