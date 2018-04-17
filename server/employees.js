const db = require('../db') //this is required
const Employees = require('../db/models/employees');
const Manages = require('../db/models/manages')
const WorksIn = require('../db/models/works-in')
const router = require('express').Router();

router.get('/employees', function (req, res, next) {
    Employees.findAll({ include: [WorksIn, Manages] }).then((result) => {
        res.status(200).send(result);
    }).catch(next);
});

router.get('/employees/:id', function (req, res, next) {
    Employees.findOne({
        where: { eid: req.params.id },
    }).then(result => {
        res.status(200).send(result);
    }).catch(next);
});

module.exports = router
