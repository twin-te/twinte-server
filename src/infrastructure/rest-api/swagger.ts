import { Server } from 'typescript-rest'
import express from 'express'

export function enableSwaggerDocument(app: express.Application) {
  const swaggerUiOptions = {
    customSiteTitle: 'Twin:te API docs',
    swaggerOptions: {
      validatorUrl: null,
      oauth2RedirectUrl: 'http://example.com/oauth2-redirect.html',
      oauth: {
        clientId: 'my-default-client-id'
      }
    }
  }

  Server.swagger(app, {
    endpoint: 'api-docs',
    filePath: './.swagger_dist/swagger.yaml',
    swaggerUiOptions: swaggerUiOptions
  })
}
