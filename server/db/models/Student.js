var db = require('../index');
var Sequelize = require('sequelize');

let Student = db.define('student', {
	firstName: {
		type: Sequelize.STRING,
		allowNull: false
	},
	lastName: {
		type: Sequelize.STRING,
		allowNull: false
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			isEmail: true
		}
	},
	gpa: {
		type: Sequelize.DECIMAL
	}
}, {
	getterMethods: {
		fullName () {
			return this.firstName + ' ' + this.lastName;
		}
	}
})

module.exports = Student;
