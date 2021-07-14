const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();
const userSchema = require('../schemas/userSchema');
const User = new mongoose.model('user', userSchema);

//SIGNUP
router.post('/signup', async (req, res) => {
	try {
		const hashedPassword = await bcrypt.hash(req.body.password, 10);
		const newUser = new User({
			name: req.body.name,
			username: req.body.username,
			password: hashedPassword,
		});
		await newUser.save();
		res.status(200).json({
			Message: 'Sign up Successfully!',
		});
	} catch {
		res.status(500).json({
			Error: 'Sign up failed!',
		});
	}
});
//LOGIN
router.post('/login', async (req, res) => {
	try {
		const user = await User.find({ username: req.body.username });
		if (user && user.length > 0) {
			const isValidPassword = await bcrypt.compare(
				req.body.password,
				user[0].password,
			);
			if (isValidPassword) {
				const token = jwt.sign(
					{
						username: user[0].username,
						userId: user[0]._id,
					},
					process.env.JWT_SECRET,
					{ expiresIn: '1h' },
				);
				res.status(200).json({
					Access_token: token,
					Message: 'Login Successfull',
				});
			} else {
				res.status(401).json({
					Error: 'Authentication Failed!',
				});
			}
		} else {
			res.status(401).json({
				Error: 'Authentication Failed!',
			});
		}
	} catch {
		res.status(401).json({
			Error: 'Authentication Failed!',
		});
	}
});
module.exports = router;
