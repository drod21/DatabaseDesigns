const db = require('../db') //this is required
const Employees = require('../db/models/employees');
const router = require('express').Router()
const crypto = require('crypto')
const jwt = require('jsonwebtoken');
const KEY = 'ThisIsTheSecretKey' // TODO: Put this somewhere else

router.put('/login', function (req, res, next) {
  Employees.findOne({
    where: { email: req.body.email },
  }).then((result) => {
    const hash = crypto.createHash('md5').update(req.body.password).digest('hex');
    const emp_id = result.dataValues.eid
    if(emp_id === 0) {
      role = 'CEO'
    } else if(emp_id >= 1 && emp_id <= 4) {
      role = 'manager'
    } else {
      role = 'employee'
    }

    const token = Object.assign({}, {
      token: jwt.sign({ emp_id: emp_id, role: role }, KEY, { expiresIn: '5 days' })
    })
    if(hash == result.emp_pw && result.active === 1)
      res.status(200).send(token);
    else
      res.status(401).send('Invalid login')
  }).catch(next);
});

module.exports = router
