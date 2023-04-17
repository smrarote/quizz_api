const { token } = require("morgan");
const Roles = require("../../configs/constants/role.map");
const { resolve } = require("path");
const { rejects } = require("assert");
const { verify } = require("crypto");
const jwt = require("jsonwebtoken");
class AuthError extends Error {
  constructor(msg) {
    super(msg);
    this.name = "AuthError";
  }
}

module.exports = class Auth {
  static #JWT_SEC = process.env.JWT_SECRET;
  static #JWT_EX_VISITOR = "1d";
  static #JWT_EX_QUIZZER = "30d";
  constructor(role) {
    this.role = role;
  }
  getToken(payload) {
    let token = null;
    return jwt.sign(payload, Auth.#JWT_SEC, {
      expiresIn:
        this.role === Roles.VISITOR
          ? Auth.#JWT_EX_VISITOR
          : Auth.#JWT_EX_QUIZZER,
    });
  }
  decodeToken(token) {
    return (decoded = jwt.verify(token, Auth.#JWT_SEC));
  }
};
