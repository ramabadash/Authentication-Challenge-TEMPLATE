const { USERS, INFORMATION } = require('../data/users.js');
const bcrypt = require('bcrypt');

// users/register - signUp
exports.register = async (req, res) => {
  const { email, user, password } = req.body;

  // Check if user exists by email
  const checkUser = USERS.find((user) => email === user.email);

  // If user exists, send appropriate response
  if (checkUser) {
    return res.status(409).send('user already exists');
  }
  //Create user
  try {
    //Encrypt password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

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
