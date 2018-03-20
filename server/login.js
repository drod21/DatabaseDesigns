const db = require('../db') //this is required
const Employees = require('../db/models/employees');
const router = require('express').Router()
const crypto = require('crypto')

router.put('/login', function (req, res, next) {
  console.log('req', req.body)
  Employees.findOne({
    where: { email: req.body.email },
  }).then(result => {
    console.log(result)
    const hash = crypto.createHash('md5').update(req.body.password).digest('hex');
    if(hash == result.password)
      res.status(200).send(result);
    else
      res.status(401).send('Invalid login')
  }).catch(next);
});

module.exports = router
