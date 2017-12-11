'use strict';

const db = require('../index');
const Campus = require('./Campus');
const Student = require('./Student');

Campus.hasMany(Student, { onDelete: 'cascade' });
Student.belongsTo(Campus);


module.exports = db
