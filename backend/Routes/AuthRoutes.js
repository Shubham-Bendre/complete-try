const express = require('express');
const router = express.Router();
const { signup, login, doctorLogin } = require('../Controllers/AuthController');

router.post('/signup', signup);         // Parent Signup
router.post('/login', login);           // Parent Login
router.post('/doctor-login', doctorLogin); // Doctor Login

module.exports = router;
