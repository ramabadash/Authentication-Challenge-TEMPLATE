const jwt = require('jsonwebtoken');
const { ACCESS_TOKEN_SECRET } = require('../../env.js');

// Validate token - send answer if not valid and pass next if valid
exports.validateTokenMiddleware = (req, res, next) => {
  const { authorization } = req.headers;
  const accessToken = authorization.split(' ')[1]; //Split from word "Bearer"
  if (!authorization || !accessToken) {
    return res.status(401).send('Access Token Required'); //No access token
  }

  //Verify token
  jwt.verify(accessToken, ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).send('Invalid Access Token');
    } else {
      req.user = user;
      next();
    }
  });
};
