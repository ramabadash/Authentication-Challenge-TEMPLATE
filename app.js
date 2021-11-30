/***** REQUIRE *****/
const express = require('express');
const app = express();
const userRouter = require('./backEnd/routers/usersRouter.js');
const apiRouter = require('./backEnd/routers/apiRouter.js');

// const cors = require('cors');

/***** MIDDLEWARE *****/
// app.use(cors({ origin: '*' }));
app.use(express.json());

/***** ROUTERS *****/
app.use('/users', userRouter); //users router
app.use('/api', apiRouter); //api router

// app.use(express.static(`./client/build`));
// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/client/build/index.html');
// });

module.exports = app;
