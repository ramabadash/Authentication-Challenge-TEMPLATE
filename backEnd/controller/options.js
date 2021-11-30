const { AllOptions } = require('../data/options.js');
const { ACCESS_TOKEN_SECRET } = require('../../env.js');
const jwt = require('jsonwebtoken');

//Returns an array of all APIs and endpoints. (sends only the available options for the current logged user permissions)
exports.getUserOptions = (req, res) => {
  try {
    const answerOptions = [];

    const { authorization } = req.headers;
    const accessToken = authorization && authorization.split(' ')[1]; //Split from word "Bearer"

    answerOptions.push(
      ...AllOptions.filter((option) => option.path === '/users/register' || option.path === '/users/login')
    );
    // Token excepted
    if (accessToken) {
      // Validate token
      jwt.verify(accessToken, ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
          answerOptions.push(...AllOptions.filter((option) => option.path === '/users/token')); //Invalid token
        } else {
          //Valid token but not admin
          answerOptions.push(
            ...AllOptions.filter(
              (option) =>
                option.path === '/users/tokenValidate' ||
                option.path === '/api/v1/information' ||
                option.path === '/users/logout' ||
                option.path === '/users/token'
            )
          );
          if (user.isAdmin) {
            answerOptions.push(...AllOptions.filter((option) => option.path === 'api/v1/users'));
          }
        }
      });
    }
    return res.set('Allow', 'OPTIONS, GET, POST').send(answerOptions);
  } catch (error) {
    throw { status: error.status, message: error.message };
  }
};
