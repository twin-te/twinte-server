import Express from 'express'

export default function(req: Express.Request, res: Express.Response, next: () => any) {
  if(req.isAuthenticated())
    next()
  else
    res.sendStatus(401)
}
