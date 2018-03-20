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
    const emp = Object.assign({}, {
      eid: result.eid,
      name: result.emp_name,
      dept: result.dept_id,
      managerId: result.manager_id,
      email: result.email
    })
    if(hash == result.emp_pw)
      res.status(200).send(emp);
    else
      res.status(401).send('Invalid login')
  }).catch(next);
});

module.exports = router
