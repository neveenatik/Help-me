var mongoose = require('mongoose');

module.exports = mongoose.model('HelpRequest', {
	title: String,
	text: String,
	user: {
		type: mongoose.Schema.ObjectId,
		ref: 'User'
	}
});