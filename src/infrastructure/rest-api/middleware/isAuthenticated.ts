import express from 'express'
import { UnauthorizedError } from 'typescript-rest/dist/server/model/errors'
export default function(req: express.Request, _?: express.Response) {
  if (!req.isAuthenticated()) throw new UnauthorizedError()
}
