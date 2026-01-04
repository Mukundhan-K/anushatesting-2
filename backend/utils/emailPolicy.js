const path = require("path");
const { throwError } = require(path.join(__dirname, "..", "middleware", "errorMiddleware.js"));

async function emailPolicy(req, res, next) {
  const { email } = req.body;
  if (!email) return next();

  const domain = email.split("@")[1]?.toLowerCase();
  if (domain !== "gmail.com") {
    return next(
      throwError("Unverified Emails are not allowed", 400)
    );
  }
  req.body.email = email.split("+")[0].replace(/\./g, "") + "@gmail.com"; // 🔥 overwrite safely

  next();
}

module.exports = emailPolicy;
