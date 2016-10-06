var mongoose = require('mongoose');

module.exports = mongoose.model('Review', {
	reviewerID : {type: String, required : true},
	revieweeID : {type: String, required : true},
	rating : {type: String, required : true},
	description : {type: String, required: true}
});