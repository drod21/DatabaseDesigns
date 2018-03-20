const db = require('../db')
const crypto = require('crypto')

const hash = crypto.createHash('md5').update('Apples12').digest('hex');

const seedItems = () => db.Promise.map([
  { id: getRandomInt(42), item_name: 'Hats', dept_id: 26, type: 'Clothes', description: 'Fedora with a feather', price_public: 10.4, price_private: 9.2},
  { id: getRandomInt(23), item_name: 'Samsung TV 52 inch OLED 4k', dept_id: 23, type: 'Entertainment', description: '52" Samsung OLED TV! 4k resolution! 240Hz refresh rate!', price_public: 699.99, price_private: 574.99 },
  { id: getRandomInt(234), item_name: 'Nintendo Switch', dept_id: 21, type: 'Entertainment', description: 'Nintendo Switch', price_public: 299.99, price_private: 249.99 },
  { id: getRandomInt(421), item_name: 'Star Wars', dept_id: 25, type: 'Movie', description: 'Episode 4: A New Hope', price_public: 9.99, price_private: 4.99 },
], item => db.model('Items').create(item));

const seedEmployees = () => db.Promise.map([
  { eid: 21, emp_name: "Derek Rodriguez", email: 'derek23@mail.usf.edu', emp_pw: hash, dept_id: 23, manager_id: 1 },
  { eid: 25, emp_name: "Anthony Teresi", email: 'anthony@gmail.com', emp_pw: hash, dept_id: 21, manager_id: 4 },
  { eid: 32, emp_name: "Joe Schmoe", email: 'joe@gmail.com', emp_pw: hash, dept_id: 26, manager_id: 3 },
  { eid: 35, emp_name: 'Brianna Grace', email: 'brianna@gmail.com', emp_pw: hash, dept_id: 25, manager_id: 2},
  { eid: 1, emp_name: "Josh Circuit", email: 'josh@gmail.com', emp_pw: hash, dept_id: 23, manager_id: 0 },
  { eid: 4, emp_name: "Robert Albrechtsson", email:'robert@gmail.com', emp_pw: hash, dept_id: 21, manager_id: 0 },
  { eid: 3, emp_name: "Cola MacCrumb", email: 'cola@gmail.com', emp_pw: hash, dept_id: 26, manager_id: 0 },
  { eid: 2, emp_name: 'Steven Spielberg', email: 'steven@gmail.com', emp_pw: hash, dept_id: 25, manager_id: 0 }

], employee => db.model('Employees').create(employee));

 const seedManagers = () => db.Promise.map([
   { mid: 1, dept_id: 23 },
   { mid: 3, dept_id: 26 },
   { mid: 4, dept_id: 21 },
   { mid: 2, dept_id: 25 }
 ], (manager) => db.model('Managers').create(manager));

 const seedDepartments = () => db.Promise.map([
   { dept_id: 23, name: 'Electronics' },
   { dept_id: 26, name: 'Home Goods' },
   { dept_id: 21, name: 'Games' },
   { dept_id: 25, name: 'Movies' },
 ], department => db.model('Departments').create(department));
 
 db.didSync
   .then(() => db.sync({force: true}))
   .then(seedItems)
   .then(items => console.log(`Seeded ${items.length} items OK`))
   .then(seedEmployees)
   .then(emps => console.log(`Seeded ${emps.length} employees OK`))
   .then(seedManagers)
   .then(mgrs => console.log(`Seeded ${mgrs.length} managers OK`))
   .then(seedDepartments)
   .then(dpts => console.log(`Seeded ${dpts.length} departments OK`))
   .catch(error => console.error(error))
   .finally(() => db.close())

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max))
}