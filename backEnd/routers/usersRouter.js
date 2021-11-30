const express = require('express');
const router = express.Router();
const { register, login } = require('../controller/users');

// localhost:8080/users

router.post('/register', register); // sign up to the server
router.post('/login', login); // Login with user details - get token

module.exports = router;
