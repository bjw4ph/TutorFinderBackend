var express = require('express')
var app = express()
var mongoose = require('mongoose');
var database = require('./config/database');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

mongoose.connect(database.url);
app.use(bodyParser.urlencoded({'extended':'true'})); 			// parse application/x-www-form-urlencoded
app.use(bodyParser.json()); 									// parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

var Location = require('./models/location.js');
var Review = require('./models/review.js');
var User = require('./models/user.js');

app.get('/tutors', function(req, res){
	res.json({message: "Get your tutors here"});
});

app.post('/addUser', function(req,res){
	var UserObj = {
		'firstName' : req.body.firstName,
		'lastName' : req.body.lastName,
		'year' : req.body.year,
		'major' : req.body.major,
		'paymentRate' : req.body.paymentRate,
		'tutorRating' : req.body.tutorRating,
		'tutorActive' : req.body.tutorActive,
		'tutorLocationDescription' : req.body.tutorLocationDescription,
		'tutorLocationGPS' : req.body.tutorLocationGPS
	}

	var newUser = new User(UserObj);
	newUser.save(function(error, title){
		if(error){
			console.log("Error " + error);
		} else {
			console.log(title);
		}
	})
	res.json({message: "You added a User"});
})

app.post('/addLocation', function(req, res){
	var LocationObj = {
		'description' : req.body.description,
		'GPSCoordinate' : req.body.GPSCoordinate,
		'activeTutors' : req.body.activeTutors
	}

	var newLocation = new Location(LocationObj);
	newLocation.save(function(error, title){
		if(error){
			console.log("Error " + error);
		} else {
			console.log(title);
		}
	})
	res.json({message: "You did it"});
})

app.post('/addRating', function(req, res){
	var reviewedRating = req.body.revieweeID
	var RatingObj = {
		'reviewerID' : req.body.reviewerID,
		'revieweeID' : req.body.revieweeID,
		'rating' : req.body.rating,
		'description' : req.body.description
	}
	var newRating = new Rating(RatingObj);
	var newRatingId
	newRating.save(function(error, title){
		if(error){
			console.log("Error " + error);
		} else {
			console.log(title);
			User.findOne({'_id': title._id}, function(error, doc){
				//Update the ratings for the User
				var oldRating = parseInt(doc.tutorRating, 10);
				var oldRatingCount = parseInt(doc.ratingsCount, 10);
				var newRatingCount = oldRatingCount + 1;
				var newRating = (oldRating*oldRatingCount + reviewedRating)/newRatingCount;
				doc.tutorRating = newRating.toString();
				doc.ratingsCount = newRatingCount;
				doc.save();	
			})


		}
	});
	res.json({message: "You added a rating"})
})

app.get()

app.listen(6565);
console.log("App listening on port 6565");