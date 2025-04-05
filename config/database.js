const { Sequelize } = require('sequelize');


const connectionString = process.env.DATABASE_URL || {
  dialect: 'sqlite',
  storage: './notes.db',
  logging: false
};

const sequelize = new Sequelize(connectionString, {
  dialectOptions: process.env.DATABASE_URL ? {
    ssl: {
      require: true,
      rejectUnauthorized: false 
    }
  } : {}
});

module.exports = sequelize;