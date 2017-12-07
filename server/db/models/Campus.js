var db = require('../index');
var Sequelize = require('sequelize');

let Campus = db.define('campus', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	imgUrl: {
		type: Sequelize.STRING,
		defaultValue: 'http://fillmurray.com/200/300'
	},
	description: {
		type: Sequelize.TEXT
	}
})

module.exports = Campus;
