const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const notesRouter = require('./routes/notes');
const { sequelize } = require('./models');

const app = express();

// Middleware
app.use(express.json());

// Database connection
sequelize.sync({ force: true }) // Use { force: true } only in development!
  .then(() => console.log('Database synced'))
  .catch(err => console.error('Database sync error:', err));
// Swagger setup
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Notes API',
      version: '1.0.0',
      description: 'A simple notes API',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Routes
app.use('/notes', notesRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API docs available at http://localhost:${PORT}/api-docs`);
});

