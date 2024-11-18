const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API Documentation',
    version: '1.0.0',
    description: 'Documentation for all available API routes.',
  },
  servers: [
    {
      url: 'https://carmanagementbackend.vercel.app',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'], // Path to your route files for API documentation
};

module.exports = swaggerJSDoc(options);
