const { USERS, INFORMATION, REFRESHTOKENS } = require('../data/users.js');

/********** Authorized User + GET DATA **********/
//Providing information to an authorized user about himself
exports.getInfo = (req, res) => {
  const { user } = req;
  res.status(200).send([INFORMATION.find((info) => info.email === user.email)]);
};

// Get all users DB if admin users
exports.getUsersDB = (req, res) => {
  const { isAdmin } = req.user; //Get valid user isAdmin value

  if (!isAdmin) {
    return res.status(403).send('Invalid Access Token'); //Not admin
  } else {
    res.status(200).send(USERS);
  }
};
