const { USERS, INFORMATION, REFRESHTOKENS } = require('../data/users.js');

/********** Authorized User **********/
//Providing information to an authorized user about himself
exports.getInfo = (req, res) => {
  const { user } = req;
  res.status(200).send([INFORMATION.find((info) => info.email === user.email)]);
};
