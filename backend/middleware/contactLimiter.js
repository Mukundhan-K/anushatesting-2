const rateLimit = require("express-rate-limit");
const path =require("path");
const {throwError} = require(path.join(__dirname, "errorMiddleware.js"));

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 55, // max 55 requests
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many contact requests. Please try again later.",
  },
  handler: (req, res) => {
    return throwError(
      {
      error: "Too many requests from this IP",
      message: "Please try again later.",
      retryAfter: Math.ceil(req.rateLimit.resetTime / 1000 / 60) + " minutes"
    }
      ,429);
  },
});

module.exports = { contactLimiter };