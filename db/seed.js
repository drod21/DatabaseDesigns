const db = require('../db')
const crypto = require('crypto')

const hash = crypto.createHash('md5').update('Apples12').digest('hex');
const id1 = getRandomInt(42)
const id2 = getRandomInt(23)
const id3 = getRandomInt(234)
const id4 = getRandomInt(421)

const seedItems = () => db.Promise.map([
  { item_id: id1, item_name: 'Hats', type: 'Clothes', description: 'Fedora with a feather', price_public: 10.4, price_private: 9.2},
  { item_id: id2, item_name: 'Samsung TV 52 inch OLED 4k', type: 'Entertainment', description: '52" Samsung OLED TV! 4k resolution! 240Hz refresh rate!', price_public: 699.99, price_private: 574.99 },
  { item_id: id3, item_name: 'Nintendo Switch', type: 'Entertainment', description: 'Nintendo Switch', price_public: 299.99, price_private: 249.99 },
  { item_id: id4, item_name: 'Star Wars', type: 'Movie', description: 'Episode 4: A New Hope', price_public: 9.99, price_private: 4.99 },
], (item) => db.model('Items').create(item));

const seedSoldIn = () => db.Promise.map([
  { item_item_id: id1, department_dept_id: 26 },
  { item_item_id: id2, department_dept_id: 23 },
  { item_item_id: id3, department_dept_id: 21 },
  { item_item_id: id4, department_dept_id: 25 }
], (sold) => db.model('SoldIn').create(sold))

const seedEmployees = () => db.Promise.map([
  { eid: 21, emp_name: 'Derek Rodriguez', email: 'derek@gmail.com', emp_pw: hash },
  { eid: 25, emp_name: 'Anthony Teresi', email: 'anthony@gmail.com', emp_pw: hash },
  { eid: 32, emp_name: 'Joe Schmoe', email: 'joe@gmail.com', emp_pw: hash },
  { eid: 35, emp_name: 'Brianna Grace', email: 'brianna@gmail.com', emp_pw: hash },
  { eid: 1, emp_name: 'Josh Circuit', email: 'josh@gmail.com', emp_pw: hash },
  { eid: 4, emp_name: 'Robert Albrechtsson', email:'robert@gmail.com', emp_pw: hash },
  { eid: 3, emp_name: 'Cola MacCrumb', email: 'cola@gmail.com', emp_pw: hash },
  { eid: 2, emp_name: 'Steven Spielberg', email: 'steven@gmail.com', emp_pw: hash },
  { eid: 0, emp_name: 'Head Honcho', email: 'honcho@gmail.com', emp_pw: hash }

], (employee) => db.model('Employees').create(employee));

const seedWorksIn = () => db.Promise.map([
  { employee_eid: 21, department_dept_id: 23 },
  { employee_eid: 25, department_dept_id: 26 },
  { employee_eid: 32, department_dept_id: 21 },
  { employee_eid: 35, department_dept_id: 25 },
  { employee_eid: 1, department_dept_id: 23 },
  { employee_eid: 2, department_dept_id: 26 },
  { employee_eid: 3, department_dept_id: 21 },
  { employee_eid: 4, department_dept_id: 25 }
], (works) => db.model('WorksIn').create(works));

const seedManages = () => db.Promise.map([
  { manager_mid: 0, employee_eid: 1 },
  { manager_mid: 0, employee_eid: 2 },
  { manager_mid: 0, employee_eid: 3 },
  { manager_mid: 0, employee_eid: 4 },
  { manager_mid: 1, employee_eid: 21 },
  { manager_mid: 2, employee_eid: 25 },
  { manager_mid: 3, employee_eid: 32 },
  { manager_mid: 4, employee_eid: 35 }
], (manage) => db.model('Manages').create(manage));


 const seedManagers = () => db.Promise.map([
   { mid: 0, name: 'Head Honcho' },
   { mid: 1, name: 'Josh Circuit' } ,
   { mid: 3, name: 'Robert Albrechtsson' },
   { mid: 4, name: 'Cola MacCrumb' },
   { mid: 2, name: 'Steven Spielberg' }
 ], (manager) => db.model('Managers').create(manager));

 const seedDepartments = () => db.Promise.map([
   { dept_id: 23, name: 'Electronics' },
   { dept_id: 26, name: 'Home Goods' },
   { dept_id: 21, name: 'Games' },
   { dept_id: 25, name: 'Movies' },
 ], (department) => db.model('Departments').create(department));
 
 db.didSync
   .then(() => db.sync({force: true}))
   .then(seedItems)
   .then((items) => console.log(`Seeded ${items.length} items OK`))
   .then(seedEmployees)
   .then((emps) => console.log(`Seeded ${emps.length} employees OK`))
   .then(seedManagers)
   .then((mgrs) => console.log(`Seeded ${mgrs.length} managers OK`))
   .then(seedDepartments)
   .then((dpts) => console.log(`Seeded ${dpts.length} departments OK`))
   .then(seedSoldIn)
   .then((sold) => console.log(`Seeded ${sold.length} item dependencies OK`))
   .then(seedWorksIn)
   .then((works) => console.log(`Seeded ${works.length} work dependencies OK`))
   .then(seedManages)
   .then((manages) => console.log(`Seeded ${manages.length} management dependencies OK`))
   .catch(error => console.error(error))
   .finally(() => db.close())

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max))
}