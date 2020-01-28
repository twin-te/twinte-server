import express from 'express'
import { HttpError } from 'typescript-rest/dist/server/model/errors'
import log4js from 'log4js'

const logger = log4js.getLogger('express')

export default function(
  err: Error,
  _: express.Request,
  res: express.Response,
  __: () => void
) {
  if (err instanceof HttpError) {
    logger.warn(err)
    res.status(err.statusCode)
    res.json({
      name: err.name,
      msg: err.message
    })
  } else {
    logger.error(err)
    res.status(500)
    res.json({
      name: err.name,
      msg: err.message
    })
  }
}
