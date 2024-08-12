const bcrypt = require("bcrypt");

const saltRounds = 10;

const hashPassword = async (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        resolve({ hash, salt });
      });
    });
  });
};

const comparePassword = async (password, hashPassword) => {
  return new Promise((resolve, reject) => {
    return bcrypt.compare(password, user.passwordHash);
  });
};

module.exports = { hashPassword, comparePassword };
