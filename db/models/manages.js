const Sequelize = require('sequelize')
const db = require('../index.js');

const Manages = db.define('Manages')


module.exports = Manages;
