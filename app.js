const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const notesRouter = require('./routes/notes');
const sequelize = require('./config/database');

const app = express();
app.use(express.json());

// swagger setup
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
        url: process.env.RENDER_EXTERNAL_URL || 'http://localhost:3000',
        description: process.env.NODE_ENV === 'production' 
          ? 'Production server' 
          : 'Development server'
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
  apis: ['./routes/*.js'] 
};

const specs = swaggerJsdoc(swaggerOptions);
app.use('/', swaggerUi.serve, swaggerUi.setup(specs));

app.use('/notes', notesRouter);


if (process.env.NODE_ENV === 'production') {
  const fs = require('fs');
  const path = require('path');
  const dir = '/tmp/data';
  
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

sequelize.sync({ force: true })
  .then(() => {
    app.listen(3000, () => {
      console.log('Server running on http://localhost:3000');
      console.log('Swagger UI at http://localhost:3000/api-docs');
    });
  })
  .catch(err => console.error('Database sync failed:', err));