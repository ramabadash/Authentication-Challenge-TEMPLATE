const express = require('express');
const router = express.Router();
const { register, login, logout, tokenValidation } = require('../controller/users');

// localhost:8080/users

/**********  LOG-REG REQUESTS ***********/
router.post('/register', register); // sign up to the server
router.post('/login', login); // Login with user details - get token
router.post('/logout', logout); // Logout Session

//
router.post('/tokenValidate', tokenValidation); // Access Token Validation

module.exports = router;
