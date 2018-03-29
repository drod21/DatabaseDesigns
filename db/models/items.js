'use strict'

const Sequelize = require('sequelize');
const db = require('../index.js');

const Items = db.define('Items', {
  item_id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  item_name: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  type: Sequelize.TEXT,
  description: Sequelize.TEXT,
  price_public: {
    type: Sequelize["DOUBLE PRECISION"],
    allowNull: false
  },
	price_private: Sequelize["DOUBLE PRECISION"]
});

module.exports = Items;
