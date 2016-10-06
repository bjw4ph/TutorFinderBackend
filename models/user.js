var mongoose = require('mongoose');

module.exports = mongoose.model('User', {
	firstName : {type: String, required : true},
	lastName : {type: String, required : true},
	year : {type: String, required : true},
	major : {type: String, required : true},
	paymentRate : {type: String, required: true},
	tutorRating : {type: String, required : false },
	ratingsCount : {type: String, required  : false},
	tutorActive : {type: Boolean, required : false},
	tutorLocationDescription : {type: String, required: false},
	tutorLocationGPS : {type: String, required: false}
});