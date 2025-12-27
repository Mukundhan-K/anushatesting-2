const path = require("path");
const router = require("express").Router();

const authMiddleware = require(path.join(__dirname,"..","middleware","authMiddleware.js"));

// const {loginLimiter} = require(path.join(__dirname,"..", "middleware", "slowDownLimiter.js"));
const {contactLimiter} = require(path.join(__dirname,"..", "middleware", "contactLimiter.js"));

const { 
  loginLimiter, 
  forgotPasswordLimiter, 
  resetPasswordLimiter,
  signupLimiter 
} = require(path.join(__dirname,"..", "middleware", "bruteForce.js"));

const validate = require(path.join(__dirname,"..", "validators", "validate.js"));
const { loginValidator } = require(path.join(__dirname,"..", "validators", "auth.validator.js"));

const blockDisposable = require(path.join(__dirname, "..", "utils", "blockDisposableMail.js"));
const checkMxMiddleware = require(path.join(__dirname, "..", "utils", "verifyMxRecord.js"));

const {createUser, loginUser, logoutUser, authUser, forgotPassword, resetPassword} = require(path.join(__dirname,"..", "controller", "authController.js"));

// create user
// api - /api/auth/signup
// 3 signups per hour per IP
// router.post("/createuser", contactLimiter, signupLimiter, loginLimiter, blockDisposable, checkMxMiddleware, loginValidator, validate, createUser);
// router.post("/createuser", createUser);

// login user
// api - /api/auth/login
router.post("/login", 
  // 1️⃣ Stop abuse ASAP
  // : Global API protection (5 requests/15min) | Brute force protection by email+IP (5 failed attempts/15min)
  contactLimiter, loginLimiter,
  // 2️⃣ Block disposable / invalid emails (cheap checks first)
  blockDisposable, checkMxMiddleware,
  // 3️⃣ Validate request body
  loginValidator, validate,
  // 4️⃣ Controller (DB logic)
  loginUser
);

// logout user
// api - /api/auth/logout
router.get("/logout", logoutUser);

// auth user
// api - /api/auth/auth
router.get("/admin", contactLimiter, authMiddleware, authUser);

// forgot password
// api - /api/auth/forgotPassword
router.post("/forgotPassword",
  // 1️⃣ Stop abuse ASAP
  // Stricter brute force (3 attempts/hour)
  contactLimiter, forgotPasswordLimiter,
  // 2️⃣ Block disposable / invalid emails (cheap checks first)
  blockDisposable, checkMxMiddleware,
  // 3️⃣ Validate request body
   validate,
  // 4️⃣ Controller (DB logic)
  forgotPassword
);

// reset password
// api - /api/auth/resetPassword/:any
router.put("/resetPassword/:token",
  // 1️⃣ Stop abuse ASAP
  // Prevent token guessing (5 attempts/hour per token)
  contactLimiter, resetPasswordLimiter,
  // 3️⃣ Validate request body
   validate,
  // 4️⃣ Controller (DB logic)
  resetPassword
);

module.exports = router;