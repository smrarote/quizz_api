const bcrypt = require("bcrypt");
const saltRounds = 10;
const options = { encoding: "hex" };

exports.createHash = (password) => {
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt, options);
  return hash;
};

exports.compareHash = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword, options);
};
