import { Router } from 'express'
import container from '../../inversify.config'
import { LectureService } from '../../application/services/LectureService'
import { TYPES } from '../../inversifyTypes'
import { check } from 'express-validator'
import simpleValidator from '../middleware/simpleValidator'

const lectureService = container.get<LectureService>(TYPES.LectureService)

const router = Router()

/**
 * @swagger
 * tags:
 *   - name: lectures
 *     description: 講義に関するAPI
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Lecture:
 *       type: object
 *       properties:
 *         lectureID:
 *           type: string
 *         name:
 *           type: string
 *         instructor:
 *           type: string
 *         details:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               module:
 *                 type: string
 *               day:
 *                 type: string
 *               period:
 *                 type: number
 *               room:
 *                 type: string
 *     Error:
 *       type: object
 *       properties:
 *         errors:
 *           type: array
 *           items:
 *              type: object
 *              properties:
 *                msg:
 *                  type: string
 *                param:
 *                  type: string
 *                location:
 *                  type: string
 */

/**
 *  @swagger
 *  /lectures/search:
 *    get:
 *      tags:
 *        - lectures
 *      summary: 講義検索
 *      description: 講義を名前で検索する
 *      parameters:
 *        - in: query
 *          name: q
 *          schema:
 *            type: string
 *          description: 検索したい講義の名前（部分一致）
 *        - in: query
 *          name: year
 *          schema:
 *            type: integer
 *          description: 検索したい年度
 *
 *      responses:
 *        200:
 *          description: 成功
 *          schema:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/Lecture'
 *
 *        422:
 *          description: パラメータ不足
 *          schema:
 *            $ref: '#/components/schemas/Error'
 *        500:
 *          description: 内部エラー
 */
router.get(
  '/search',
  check('q').isString(),
  check('year').isNumeric(),
  simpleValidator,
  async (req, res) => {
    try {
      res.json(await lectureService.searchByName(req.query.q, req.query.year))
    } catch (e) {
      console.error(e)
      res.sendStatus(500).end()
    }
  }
)

/**
 *  @swagger
 *  /lectures/{year}/{lectureID}:
 *    get:
 *      tags:
 *        - lectures
 *      summary: 講義取得
 *      description: 講義の情報を取得する
 *      parameters:
 *        - in: path
 *          name: year
 *          schema:
 *            type: integer
 *          description: 年度
 *        - in: path
 *          name: lectureID
 *          schema:
 *            type: string
 *          description: 講義ID
 *
 *      responses:
 *        200:
 *          description: 成功
 *          schema:
 *            $ref: '#/components/schemas/Lecture'
 *        500:
 *          description: 内部エラー
 */
router.get(
  '/:year/:lectureID',
  check('year').isNumeric(),
  check('lectureID').isString(),
  simpleValidator,
  async (req, res) => {
    try {
      res.json(
        await lectureService.findByLectureID(
          req.params.lectureID,
          req.params.year
        )
      )
    } catch (e) {
      console.error(e)
      res.sendStatus(500).end()
    }
  }
)

export default router
