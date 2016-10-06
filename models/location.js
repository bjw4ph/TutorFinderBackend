var mongoose = require('mongoose');

module.exports = mongoose.model('Location', {
	description : {type: String, required : true},
	GPSCoordinate : {type: String, required : true},
	activeTutors : {type: Array, required : true}
	
});