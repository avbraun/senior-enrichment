// Wasn't able to get associations to work with this seed.



// const db = require('./server/db');
// const Student = require('./server/db/models/Student')
// const Campus = require('./server/db/models/Campus')

// const campuses = [
//   {
//     name: 'planet',
//     imgUrl: 'http://fillmurray.com/200/300',
//     description: ''
//   },
//   {
//     name: 'planet',
//     imgUrl: 'http://fillmurray.com/200/300',
//     description: ''
//   },
//   {
//     name: 'planet',
//     imgUrl: 'http://fillmurray.com/200/300',
//     description: ''
//   },
//   {
//     name: 'planet',
//     imgUrl: 'http://fillmurray.com/200/300',
//     description: ''
//   },
// ];

// const students = [
// {
//   firstName: 'Cody',
//   lastName: 'McBob',
//   email: 'cody@gmail.com',
//   gpa: 3.5,
//   // campusId: 1
// }, {
//   firstName: 'Cody',
//   lastName: 'McBob',
//   email: 'cody@gmail.com',
//   gpa: 3.5,
//   // campusId: 1
// }, {
//   firstName: 'Cody',
//   lastName: 'McBob',
//   email: 'cody@gmail.com',
//   gpa: 3.5,
//   // campusId: 1
// }, {
//   firstName: 'Cody',
//   lastName: 'McBob',
//   email: 'cody@gmail.com',
//   gpa: 3.5,
//   // campusId: 1
// }, {
//   firstName: 'Cody',
//   lastName: 'McBob',
//   email: 'cody@gmail.com',
//   gpa: 3.5,
//   // campusId: 1
// }];



// const seed = () =>
//   Promise.all(students.map(student =>
//     Student.create(student))
//   )
//   .then(() =>
//   Promise.all(campuses.map(campus =>
//     Campus.create(campus))
//   ))
// ;


// const main = () => {
//   console.log('Syncing db...');
//   db.sync({ force: true })
//     .then(() => {
//       console.log('Seeding databse...');
//       return seed();
//     })
//     .catch(err => {
//       console.log('Error while seeding');
//       console.log(err.stack);
//     })
//     .then(() => {
//       db.close();
//       return null;
//     });
// };

// main();

