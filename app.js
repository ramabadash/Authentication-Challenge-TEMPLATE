/***** REQUIRE *****/
const express = require('express');
const app = express();
const userRouter = require('./backEnd/routers/usersRouter.js');
const apiRouter = require('./backEnd/routers/apiRouter.js');
const { getUserOptions } = require('./backEnd/controller/options.js');

/***** MIDDLEWARE *****/
app.use(express.json());

/***** ROUTERS *****/
app.use('/users', userRouter); //users router
app.use('/api/v1', apiRouter); //api router

//Returns an array of all APIs and endpoints. (sends only the available options for the current logged user permissions)
app.options('/', getUserOptions);

module.exports = app;
