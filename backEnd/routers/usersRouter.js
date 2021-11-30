const express = require('express');
const router = express.Router();
const { register, login, logout, tokenValidation, renewAccessToken } = require('../controller/users');
const { validateTokenMiddleware } = require('../middlewares/validators.js');

// localhost:8080/users

/**********  LOG-REG REQUESTS ***********/
router.post('/register', register); // sign up to the server
router.post('/login', login); // Login with user details - get token
router.post('/logout', logout); // Logout Session

/**********  TOKENS ***********/
router.post('/tokenValidate', validateTokenMiddleware, tokenValidation); // Access Token Validation
router.post('/token', renewAccessToken); //Renew access token by refresh token

module.exports = router;
