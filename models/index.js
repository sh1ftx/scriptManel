'use strict';

const fs        = require('fs');
const path      = require('path');
const Sequelize = require('sequelize');

const env      = process.env.NODE_ENV || 'development';
const basename = path.basename(__filename);
const config   = require(path.join(__dirname, '../config/config.json'))[env];

const db = {};
let sequelize;

/* ===========================
   CONEXÃO COM O BANCO
=========================== */
sequelize = config.use_env_variable
  ? new Sequelize(process.env[config.use_env_variable], config)
  : new Sequelize(
      config.database,
      config.username,
      config.password,
      config
    );

/* ===========================
   CARREGAMENTO DOS MODELS
=========================== */
fs.readdirSync(__dirname)
  .filter((file) =>
    file !== basename &&
    file.endsWith('.js') &&
    !file.startsWith('.') &&
    !file.endsWith('.test.js')
  )
  .forEach((file) => {
    const modelPath = path.join(__dirname, file);
    const model = require(modelPath)(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

/* ===========================
   ASSOCIAÇÕES
=========================== */
Object.values(db).forEach((model) => {
  if (typeof model.associate === 'function') {
    model.associate(db);
  }
});

/* ===========================
   EXPORTAÇÕES
=========================== */
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
