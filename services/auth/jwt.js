const jwt = require("jsonwebtoken");
const JWT_SEC = process.env.JWT_SECRET;

const getToken = (payload, expiry) => {
  let token = null;
  return jwt.sign(payload, JWT_SEC, {
    expiresIn: expiry,
  });
};

const decodeToken = (token) => {
  return jwt.verify(token, JWT_SEC);
};

module.exports = {
  getToken,
  decodeToken,
};
