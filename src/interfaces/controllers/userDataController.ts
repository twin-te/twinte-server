import { Router } from 'express'
import container from '../../inversify.config'
import { TYPES } from '../../inversifyTypes'
import isAuthenticated from '../middleware/isAuthenticated'
import { UserDataService } from '../../application/services/UserDataService'
const router = Router()
const userDataService = container.get<UserDataService>(TYPES.UserDataService)

router.use(isAuthenticated)
router.get('/:year/:lectureID', async (req, res) => {
  res.json(
    await userDataService.getUserData(
      req.user!.id,
      req.params.lectureID,
      req.params.year
    )
  )
})

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
