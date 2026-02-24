import swaggerJsDoc from 'swagger-jsdoc';

export const swaggerSpec = swaggerJsDoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'GST Automation SaaS API',
      version: '1.0.0'
    }
  },
  apis: []
});
