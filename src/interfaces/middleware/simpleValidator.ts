import { validationResult } from 'express-validator'
import Express from 'express'
export default function(
  req: Express.Request,
  res: Express.Response,
  next: () => void
) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() })
    return
  }
  next()
}
