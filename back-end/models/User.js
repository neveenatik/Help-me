var mongoose = require('mongoose');

module.exports = mongoose.model('User', {
	name: {
		first: String,
		last: String
	},
	email: String,
	pwd: String,
	gender: String,
	date: {
		month:String,
		day: Number,
		year: Number
	},
	city: String
})