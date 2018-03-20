'use strict';

const Managers = require('./managers');
const Items = require('./items');
const Employees = require('./employees');
const Departments = require('./departments');

Employees.hasMany(Departments);
Employees.hasMany(Managers)
Items.hasOne(Departments);
Managers.hasOne(Departments);

module.exports = { Managers, Items, Employees, Departments };
