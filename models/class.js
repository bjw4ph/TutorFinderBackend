var mongoose = require('mongoose');

module.exports = mongoose.model('Class', {
	className : {type: String, required : true},
	classCode : {type: String, required : true},
	 : {type: Array, required : false}
	
});