const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const notesRouter = require('./routes/notes');
const sequelize = require('./config/database');

// Initialize Express
const app = express();
app.use(express.json());

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Notes API',
      version: '1.0.0',
      description: 'A simple notes API with Swagger documentation'
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server'
      }
    ],
    components: {
      schemas: {
        Note: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              readOnly: true
            },
            title: {
              type: 'string',
              example: 'My First Note'
            },
            content: {
              type: 'string',
              example: 'This is the note content'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              readOnly: true
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              readOnly: true
            }
          }
        }
      }
    }
  },
  apis: ['./routes/*.js'] // Now looking at route files for docs
};

const specs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Routes
app.use('/notes', notesRouter);

// Sync database and start server
sequelize.sync({ force: true })
  .then(() => {
    app.listen(3000, () => {
      console.log('Server running on http://localhost:3000');
      console.log('Swagger UI at http://localhost:3000/api-docs');
    });
  })
  .catch(err => console.error('Database sync failed:', err));