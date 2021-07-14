const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const aboutHandler = require('./routeHandler/aboutHandler');
const userHandler = require('./routeHandler/userHandler');

const url = 'mongodb://localhost/users';
var app = express();
dotenv.config();
app.config = {
	port: 3000,
};

app.use(express.json());
mongoose
	.connect(url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})

	.then(() => {
		console.log('Fardin you have done a great job!');
	})
	.catch(err => {
		console.log("You're failed BRO!");
	});
app.use('/about', aboutHandler);
app.use('/user', userHandler);
const errorHandler = (err, req, res, next) => {
	if (res.headersSent) {
		return next(err);
	} else {
		res.status(500).json({
			Error: err,
		});
	}
};
app.use(errorHandler);
app.listen(app.config.port, () => {
	console.log(`Server runing at ${app.config.port}`);
});
