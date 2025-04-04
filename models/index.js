
const { Sequelize } = require('sequelize');
const Note = require('./note');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

const db = {
  sequelize,
  Note: Note(sequelize)
};

module.exports = db;