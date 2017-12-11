'use strict'
const apiRouter = require('express').Router()
const db = require('../db')
const Campus = require('../db/models/Campus');
const Student = require('../db/models/Student');

// CAMPUS ROUTES

// RETRIEVES ALL CAMPUSES
apiRouter.get('/campuses', (req, res, next) => {
	return Campus.findAll()
		.then(campuses => {
			res.json(campuses);
		})
		.catch(next);
});

// RETRIEVES ONE CAMPUS
apiRouter.get('/campuses/:campusId', (req, res, next) => {
	return Campus.findOne({
		where: {
			id: req.params.campusId
		}
	})
		.then(campus => {
			res.json(campus);
		})
		.catch(next);
});

// RETRIEVES STUDENTS FROM ONE CAMPUS
apiRouter.get('/campuses/:campusId/students', (req, res, next) => {
	return Student.findAll({
		where: { campusId: req.params.campusId }
	})
		.then(students => {
			res.json(students);
		})
		.catch(next);
});

// CREATES NEW CAMPUS
apiRouter.post('/campuses/new', (req, res, next) => {
	Campus.create(req.body)
		.then(newCampus =>
			res.json(newCampus)
		)
		.catch(next);
})

// DELETES CAMPUS
apiRouter.delete('/campuses/:campusId', (req, res, next) => {
	let campusId = req.params.campusId;
	Campus.destroy({
		where: { id: campusId }
	})
		.then(() => {
			res.status(204).send();
		})
		.catch(next);
})

// UPDATES CAMPUS
apiRouter.put('/campuses/:campusId', (req, res, next) => {
	let campusId = req.params.campusId;

	Campus.findOne({
		where: { id: campusId }
	})
		.then(foundCampus => {
			foundCampus.update(req.body);
		})
		.then(updatedCampus => {
			res.json(updatedCampus);
		})
		.catch(next);
});



// STUDENT ROUTES

// CREATES NEW STUDENT
apiRouter.post('/students/new', (req, res, next) => {
	Student.create(req.body)
		.then(newStudent =>
			res.json(newStudent)
		)
		.catch(next);
})

// RETRIEVES ALL STUDENTS
apiRouter.get('/students',  (req, res, next) => {
	return Student.findAll()
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

// DELETES STUDENT
apiRouter.delete('/students/:studentId', (req, res, next) => {
	let studentId = req.params.studentId;
	Student.destroy({
		where: { id: studentId }
	})
		.then(() => {
			res.status(204).send();
		})
		.catch(next);
})

// UPDATES STUDENT
apiRouter.put('/students/:studentId', (req, res, next) => {
	let studentId = req.params.studentId;

	Student.findOne({
		where: { id: studentId }
	})
		.then(foundStudent => {
			foundStudent.update(req.body);
		})
		.then(updatedStudent => {
			res.json(updatedStudent);
		})
		.catch(next);
});


// You can put all routes in this file; HOWEVER, this file should almost be like a table of contents for the routers you create

module.exports = apiRouter;
