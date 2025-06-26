import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'API Docs',
    version: '1.0.0'
  },
  paths: {
    '/': {
      get: {
        summary: 'Root route',
        responses: {
          200: {
            description: 'OK'
          }
        }
      }
    }
  }
};

export function setupSwagger(app: Express) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}
