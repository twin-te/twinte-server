import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { Express } from 'express'

const swaggerDefinition = {
  info: {
    title: 'Twin:te',
    version: '1.0.0',
    description: 'Twin:te Backend'
  },
  components: {}
}

const swaggerSpec = swaggerJSDoc({
  swaggerDefinition,
  apis: ['src/interfaces/controllers/*.ts']
})

export default function(app: Express) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
}
