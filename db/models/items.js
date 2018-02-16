'use strict'

const Sequelize = require('sequelize');
const db = require('../index.js');

const Items = db.define('items', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  item_name: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  dept_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  type: Sequelize.TEXT,
  description: Sequelize.TEXT,
  price_public: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

module.exports = Items;
