const db = require('../db') //this is required
const Employees = require('../db/models/employees');
const router = require('express').Router()
const crypto = require('crypto')
const jwt = require('jsonwebtoken');
const KEY = 'ThisIsTheSecretKey' // TODO: Put this somewhere else

router.put('/login', function (req, res, next) {
  console.log('req', req.body)
  Employees.findOne({
    where: { email: req.body.email },
  }).then((result) => {
    const hash = crypto.createHash('md5').update(req.body.password).digest('hex');
    const token = Object.assign({}, {
      token: jwt.sign({ emp_id: result.emp_id, role: 'user' }, KEY, { expiresIn: '5 days' })
    })
    console.log(token.token)
    if(hash == result.emp_pw)
      res.status(200).send(token);
    else
      res.status(401).send('Invalid login')
  }).catch(next);
});

module.exports = router
