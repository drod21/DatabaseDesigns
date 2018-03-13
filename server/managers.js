const db = require('../db') //this is required
const Managers = require('../db/models/managers');
const Employees = require('../db/models/employees');

const router = require('express').Router()

router.get('/', function(req, res, next) {
    Managers.findAll()
        .then(result => {
            res.status(200).send(result);
        })
        .catch(next);
});

router.get('/:id', function(req, res, next) {
    Managers.findOne({
            where:{id:req.params.id},
            include: [Employees]
        })
        .then(result => {
            res.status(200).send(result);
        })
        .catch(next);
});

module.exports = router
