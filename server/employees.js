const db = require('../db') //this is required
const Employees = require('../db/models/employees');
const router = require('express').Router();

router.get('/', function (req, res, next) {
    Employees.findAll().then(result => {
        res.status(200).send(result);
    }).catch(next);
});

router.get('/:id', function (req, res, next) {
    Employees.findOne({
        where: { eid: req.params.id },
    }).then(result => {
        res.status(200).send(result);
    }).catch(next);
});

module.exports = router
