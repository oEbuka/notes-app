const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './notes.db',
  logging: false
});

module.exports = sequelize;