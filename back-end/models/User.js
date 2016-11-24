var mongoose = require('mongoose');
//========================================
module.exports = mongoose.model('User', {
	fName: String,
	lName: String,
	email: String,
	pwd: String,
	gender: String,
	birthDate: {
		month: String,
		day: String,
		year: String
	},
	city: String
});
