const api = module.exports = require('express').Router()
const items = require('./items');
const managers = require('./managers');
const employees = require('./employees');
const login = require('./login');
const departments = require('./department');
// import products from './products';
api
  .get('/express-test', (req, res) => res.send({express: 'working!'})) //demo route to prove api is working
  .get('/items', items)
  .get('/items/:id', items)
  .put('items/:id', items)
  .get('/departments', departments)
  .get('/departments/:id', departments)
  .get('/managers', managers)
  .get('/managers/:id', managers)
  .get('/employees', employees)
  .get('/employees/:id', employees)
  .put('/login', login)

// No routes matched? 404.
api.use((req, res) => res.status(404).end())
