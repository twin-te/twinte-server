import { Server } from 'typescript-rest'
import express from 'express'

export function enableSwaggerDocument(app: express.Application) {
  const swaggerUiOptions = {
    customSiteTitle: 'My Awesome Docs',
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
    host: 'localhost:3000',
    schemes: ['http'],
    swaggerUiOptions: swaggerUiOptions
  })
}
