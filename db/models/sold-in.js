const Sequelize = require('sequelize')
const db = require('../index.js');

const SoldIn = db.define('SoldIn')


module.exports = SoldIn;
