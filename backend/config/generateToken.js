const jwt = require("jsonwebtoken");

async function generateToken(data) {
  return jwt.sign(
    {...data},
    process.env.AUTH_TOKEN,
    {expiresIn : "60m"}
  );
};

async function createSignupToken (data) {
  return jwt.sign(
    data,
    process.env.AUTH_TOKEN,
    {expiresIn : "10m"}
  );
};

async function verifyToken (data) {
  return jwt.verify(data, process.env.AUTH_TOKEN);
};

module.exports = {generateToken, createSignupToken, verifyToken};