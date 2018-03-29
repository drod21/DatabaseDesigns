const Sequelize = require('sequelize')
const db = require('../index.js');

const WorksIn = db.define('WorksIn')

module.exports = WorksIn;
