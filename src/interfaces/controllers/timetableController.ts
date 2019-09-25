import { Router } from 'express'
import container from '../../inversify.config'
import { TYPES } from '../../inversifyTypes'
import { TimetableService } from '../../application/services/TimetableService'
import isAuthenticated from '../middleware/isAuthenticated'
const router = Router()
const timetableService = container.get<TimetableService>(TYPES.TimetableService)

router.use(isAuthenticated)


router.get('/:year/:module', async (req, res) => {
  res.json(
    await timetableService.getTimetable(
      req.user!.id,
      Number(req.params.year),
      req.params.module
    )
  )
})

router.get('/:year', async (req, res) => {
  res.json(
    await timetableService.getTimetable(req.user!.id, Number(req.params.year))
  )
})

router.post('/', async (req, res) => {
  req.user
  await timetableService.updatePeriodByLectureID(
    req.user!.id,
    req.body.lectureID,
    req.body.year
  )
  res.json({ msg: 'ok' })
})

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
