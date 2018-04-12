'use strict';

const Managers = require('./managers');
const Items = require('./items');
const Employees = require('./employees');
const Departments = require('./departments');
const WorksIn = require('./works-in');
const SoldIn = require('./sold-in');
const Manages = require('./manages');

WorksIn.belongsTo(Employees);
WorksIn.belongsTo(Departments);
Items.hasOne(SoldIn)
Departments.hasMany(SoldIn)

Manages.belongsTo(Employees);
Manages.belongsTo(Managers);
module.exports = { Managers, Items, Employees, Departments };
