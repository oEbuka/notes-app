const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize({
//   dialect: 'sqlite',
//   storage,
//   logging: false
// });

// module.exports = sequelize;

module.exports = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // Needed for Render's PostgreSQL
    }
  }
});