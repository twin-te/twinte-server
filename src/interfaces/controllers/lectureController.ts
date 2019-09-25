import { Router } from 'express'
import container from '../../inversify.config'
import { LectureService } from '../../application/services/LectureService'
import { TYPES } from '../../inversifyTypes'

const lectureService = container.get<LectureService>(TYPES.LectureService)

const router = Router()

router.get('/search', async (req, res) => {
  try {
    res.json(await lectureService.searchByName(req.query.q, req.query.year))
  } catch (e) {
    console.error(e)
    res.sendStatus(500).end()
  }
})

router.get('/:year/:lectureID', async (req, res) => {
  try {
    res.json(
      await lectureService.findByLectureID(req.params.lectureID, req.params.year)
    )
  } catch (e) {
    console.error(e)
    res.sendStatus(500).end()
  }
})

export default router
