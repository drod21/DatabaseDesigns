const db = require('../db') //this is required
const Employees = require('../db/models/employees');
const Manages = require('../db/models/manages')
const WorksIn = require('../db/models/works-in')
const router = require('express').Router();
const crypto = require('crypto')

router.get('/employees', function (req, res, next) {
    Employees.findAll({ include: [ WorksIn, Manages ] }).then((result) => {
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

const managerMap = { 
    23: 1, 
    26: 2,
    21: 3,
    25: 4
}

router.post('/employees', async function (req, res, next) {
    const emp = req.body.employee

    const works = Object.assign({}, {
        employee_eid: emp.eid,
        department_dept_id: emp.dept
    })

    const managedBy = Object.assign({}, {
        employee_eid: emp.eid,
        manager_mid: managerMap[emp.dept]
    })

    emp.emp_pw = crypto.createHash('md5').update(emp.emp_pw).digest('hex');
    delete emp.dept_id
    await Employees.create(emp).then((result) => {
        return WorksIn.create(works)
    }).then((result) => {
        return Manages.create(managedBy)
    }).then((result) => {
        return Employees.findAll({ include: [WorksIn, Manages] })
    }).then((result) => {
        res.status(200).send(result);
    }).catch((err) => {
        console.log('error', err)
        return next
    })
})

router.put('/employees', async function (req, res, next) {
    const emp = req.body.employee
    // this means the employee's pw was updated
    if(emp.emp_pw) {
        emp.emp_pw = crypto.createHash('md5').update(emp.emp_pw).digest('hex');
    }

    const works = Object.assign({}, {
        employee_eid: emp.eid,
        department_dept_id: emp.dept_id
    })

    const managedBy = Object.assign({}, {
        employee_eid: emp.eid,
        manager_mid: managerMap[emp.dept_id]
    })

    delete emp.dept_id
    await Employees.findOne({ where: { eid: emp.eid }}).then((result) => {
        const updatedEmp = Object.assign(result, emp)
        return updatedEmp.save()
    }).then((result) => {
        return Employees.findAll({ include: [ WorksIn, Manages ] })
    }).then((result) => {
        res.status(200).send(result);
    }).catch(next)
})

router.delete('/employees/:eid', async function (req, res, next) {
    await Employees.findOne({ where: { eid: req.params.eid }}).then((result) => {
        const updatedEmp = Object.assign(result, { active: 0 })
        return updatedEmp.save()
    }).then((result) => {
        return Employees.findAll({ include: [ WorksIn, Manages ] })
    }).then((result) => {
        res.status(200).send(result);
    }).catch(next);
})

module.exports = router
