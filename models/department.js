var mongoose = require('mongoose');

module.exports = mongoose.model('Department', {
	departmentName : {type: String, required : true},
	departmentCode : {type: String, required : true},
	classIDs : {type: Array, required : false}
	
});