const express = require('express');
const router = express.Router();
const { register } = require('../controller/users');

// localhost:8080/users

// sign up to the server
router.post('/register', register);

module.exports = router;
