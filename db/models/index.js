'use strict';

const Managers = require('./managers');
const Items = require('./items');
const Employees = require('./employees');
const Departments = require('./departments');
const WorksIn = require('./works-in');
const SoldIn = require('./sold-in');
const Manages = require('./manages');

Items.hasOne(SoldIn)
Departments.hasMany(SoldIn)

Employees.hasOne(Manages);
Managers.hasMany(Manages);

Employees.hasMany(WorksIn)
Departments.hasMany(WorksIn)
module.exports = { Managers, Items, Employees, Departments };
