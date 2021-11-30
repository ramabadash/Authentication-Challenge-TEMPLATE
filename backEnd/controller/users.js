const { USERS, INFORMATION } = require('../data/users.js');
const bcrypt = require('bcrypt');

// users/register - signUp
exports.register = async (req, res) => {
  const { email, user, password } = req.body;

  const checkUser = USERS.find((user) => email === user.email); // Check if user exists by email

  if (checkUser) {
    return res.status(409).send('user already exists'); // If user exists, send appropriate response
  }
  //Create user
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt); //Encrypt password

    //Store in "DB"
    USERS.push({ email, name: user, password: hashedPassword, isAdmin: false });
    INFORMATION.push({
      email,
      info: `${user} info`,
    });

    return res.status(201).send('Register Success');
  } catch (error) {
    throw { status: error.status, message: error.message };
  }
};
