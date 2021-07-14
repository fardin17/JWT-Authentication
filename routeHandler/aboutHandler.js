const express = require('express');
const checkLogin = require('../middlewares/checkLogin');

const router = express.Router();

router.get('/', checkLogin, (req, res) => {
	console.log(req.username);
	console.log(req.userId);
	console.log('Hello Fardin!');
	res.send('Hello Fardin!');
});

module.exports = router;
