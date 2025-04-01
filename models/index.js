const { Sequelize } = require('sequelize');
const config = require('../config/database');
const Note = require('./note');

const sequelize = new Sequelize(config.development);

const db = {
  sequelize,
  Sequelize,
  Note: Note(sequelize, Sequelize.DataTypes)
};

module.exports = db;