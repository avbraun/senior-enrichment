'use strict'
const apiRouter = require('express').Router()
const db = require('../db')
const Campus = require('../db/models/Campus');
const Student = require('../db/models/Student');
// const studentRouter =

// If you aren't getting to this object, but rather the index.html (something with a joke) your path is wrong.
	// I know this because we automatically send index.html for all requests that don't make sense in our backend.
	// Ideally you would have something to handle this, so if you have time try that out!
// apiRouter.get('/hello', (req, res) => res.send({hello: 'world'}))

// RETRIEVES ALL CAMPUSES
apiRouter.get('/campuses', (req, res, next) => {
	return Campus.findAll()
		.then(campuses => {
			res.json(campuses);
		})
		.catch(next);
});

// RETRIEVES ALL STUDENTS
apiRouter.get('/students',  (req, res, next) => {
	return Student.findAll()
		.then(students => {
			res.json(students);
		})
		.catch(next);
});

// RETRIEVES STUDENTS FROM ONE CAMPUS
apiRouter.get('/campuses/:campusId', (req, res, next) => {
	return Student.findAll({
		where: { campusId: req.params.campusId }
	})
		.then(students => {
			res.json(students);
		})
		.catch(next);
});

// RETRIEVES ONE STUDENT
apiRouter.get('/students/:studentId', (req, res, next) => {
	return Student.findOne({
		where: { id: req.params.studentId }
	})
		.then(students => {
			res.json(students);
		})
		.catch(next);
})

// CREATES NEW CAMPUS
apiRouter.post('/campuses', (req, res, next) => {
	Campus.create(req.body)
		.then(newCampus => {
			console.log(newCampus);
		})
		.catch(next);
})

// CREATES NEW STUDENT
apiRouter.post('/students', (req, res, next) => {
	Student.create(req.body)
		.then(newStudent => {
			console.log(newStudent);
		})
		.catch(next);
})


// You can put all routes in this file; HOWEVER, this file should almost be like a table of contents for the routers you create

module.exports = apiRouter;
