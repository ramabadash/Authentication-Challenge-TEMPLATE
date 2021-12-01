const { USERS, INFORMATION, REFRESHTOKENS } = require('../data/users.js');
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = require('../../env.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**********  LOG-REG REQUESTS ***********/

// users/register - signUp
exports.register = async (req, res) => {
  const { email, name, password } = req.body;
  const checkUser = USERS.find((user) => email === user.email); // Check if user exists by email

  if (checkUser) {
    return res.status(409).send('user already exists'); // If user exists, send appropriate response
  }
  //Create user
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt); //Encrypt password

    //Store in "DB"
    USERS.push({ email, name, password: hashedPassword, isAdmin: false });
    INFORMATION.push({
      email,
      info: `${name} info`,
    });

    return res.status(201).send('Register Success');
  } catch (error) {
    throw { status: error.status, message: error.message };
  }
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const checkUser = USERS.find((user) => email === user.email); // Check if user exists by email

    if (!checkUser) {
      return res.status(404).send('cannot find user'); // If user doesn't exists, send appropriate response
    }
    //Verify username and password
    const isPassword = await bcrypt.compare(password, checkUser.password);

    if (!isPassword) {
      return res.status(403).send('User or Password incorrect'); //Wrong details
    } else {
      //Generate tokens
      const userData = { email: checkUser.email, name: checkUser.name, isAdmin: checkUser.isAdmin };
      const refreshToken = jwt.sign(userData, REFRESH_TOKEN_SECRET);
      const accessToken = jwt.sign(userData, ACCESS_TOKEN_SECRET, {
        expiresIn: '10s',
      });
      REFRESHTOKENS.push(refreshToken);

      return res.status(200).send({
        accessToken: accessToken,
        refreshToken: refreshToken,
        ...userData,
      });
    }
  } catch (error) {
    throw { status: error.status, message: error.message };
  }
};

// logout session
exports.logout = (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).send('Refresh Token Required');
  }

  const refTokenIndex = REFRESHTOKENS.indexOf(token);
  if (refTokenIndex === -1) {
    //Not found
    return res.status(400).send('Invalid Refresh Token');
  }
  REFRESHTOKENS.splice(refTokenIndex, 1); //Delete refresh token from DB
  return res.status(200).send('User Logged Out Successfully');
};

/********** TOKEN VALIDATION **********/
exports.tokenValidation = (req, res) => res.status(200).send({ valid: true });

// Renew access token by refresh token
exports.renewAccessToken = (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(401).send('Refresh Token Required'); //No refresh token
  }

  //Verify token
  const user = REFRESHTOKENS.find((refToken) => refToken === token);

  if (!user) {
    return res.status(403).send('Invalid Refresh Token'); //Invalid - doesn't exists in DB
  } else {
    try {
      //Validate token
      jwt.verify(token, REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) {
          return res.status(403).send('Invalid Refresh Token'); //Invalid - doesn't valid by jwt
        } else {
          //Generate tokens
          const userData = { email: user.email, name: user.name, isAdmin: user.isAdmin };
          const accessToken = jwt.sign(userData, ACCESS_TOKEN_SECRET, {
            expiresIn: '10s',
          });
          res.status(200).send({ accessToken });
        }
      });
    } catch (error) {
      throw { status: error.status, message: error.message };
    }
  }
};
