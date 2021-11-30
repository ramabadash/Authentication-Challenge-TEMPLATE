/***** CONSTANTS *****/

// contain objects - {email, name, password, isAdmin}
const USERS = [
  {
    email: 'admin@email.com',
    name: 'admin',
    password: '$2b$10$kdXzMfLXkURVha/oO0stTOJO1k8cxuJnrfPao3nvIN.tsfHdEKyEy',
    isAdmin: true,
  },
];

// contain objects - {email, info}
const INFORMATION = [];

const REFRESHTOKENS = [];

module.exports = { USERS, INFORMATION, REFRESHTOKENS };
