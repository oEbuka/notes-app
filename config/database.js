const { Sequelize } = require('sequelize');

const storage = process.env.NODE_ENV === 'production' 
  ? '/tmp/data/notes.db'  // More organized path
  : './notes.db';


const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage,
  logging: false
});

module.exports = sequelize;