exports.errorCodes = {
  SUCCESS: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  NOT_MODIFIED: 304,
  BAD_REQUEST: 400,
  UNOTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  SERVER_ERR: 500,
};

exports.errorNames = {
  validation: "VALIDN_ERR",
  db: "DB_ERR",
  system: "SYSM_ERR",
};
