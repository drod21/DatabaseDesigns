const db = require('../db') 
const Departments = require('../db/models/departments');

const router = require('express').Router();

router.get('/', function (req, res, next) {
  Departments.findAll()
    .then(result => {
      res.status(200).send(result);
    })
    .catch(next);
});

router.get('/:id', function (req, res, next) {
  Departments.findOne({
    where: { dept_id: req.params.id }
  })
    .then(result => {
      res.status(200).send(result);
    })
    .catch(next);
});

module.exports = router
