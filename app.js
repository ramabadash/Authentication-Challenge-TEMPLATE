const express = require('express');
const app = express();
// const cors = require('cors');

// app.use(cors({ origin: '*' }));
app.use(express.json());

// app.use(express.static(`./client/build`));
// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/client/build/index.html');
// });

module.exports = app;
