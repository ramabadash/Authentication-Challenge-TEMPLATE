const express = require('express');
const router = express.Router();
const { getInfo } = require('../controller/api.js');
const { validateTokenMiddleware } = require('../middlewares/validators.js');

router.get('/information', validateTokenMiddleware, getInfo); //Access user's information, Required: header: {Authorization: "Bearer -access token-"}

module.exports = router;
