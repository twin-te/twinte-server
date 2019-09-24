import { Router } from 'express'
import container from '../../inversify.config'
import { LectureService } from '../../application/services/LectureService'
import { TYPES } from '../../types'

const findLectureUseCase = container.get<LectureService>(
  TYPES.FindLectureUseCase
)

const router = Router()

router.get('/search', async (req, res) => {
  try {
    res.json(await findLectureUseCase.searchByName(req.query.q, req.query.year))
  } catch (e) {
    console.error(e)
    res.sendStatus(500).end()
  }
})

router.get('/:year/:lectureID', async (req, res) => {
  try {
    res.json(
      await findLectureUseCase.findByLectureID(
        req.params.lectureID,
        req.params.year
      )
    )
  } catch (e) {
    console.error(e)
    res.sendStatus(500).end()
  }
})

export default router
