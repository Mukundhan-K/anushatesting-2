const path = require("path");
const router = require("express").Router();

const authMiddleware = require(path.join(__dirname,"..","middleware","authMiddleware.js"));
const verifyAdminUser = require(path.join(__dirname,"..","middleware","verifyAdminMiddleware.js"));

const {loginLimiter:slowDownLimiter} = require(path.join(__dirname,"..", "middleware", "slowDownLimiter.js"));
const {contactLimiter} = require(path.join(__dirname,"..", "middleware", "contactLimiter.js"));

const { 
  loginLimiter, 
  forgotPasswordLimiter, 
  resetPasswordLimiter,
  signupLimiter 
} = require(path.join(__dirname,"..", "middleware", "bruteForce.js"));

const validate = require(path.join(__dirname,"..", "validators", "validate.js"));
const { loginValidator, forgotPasswordValidator, resetPasswordValidator } = require(path.join(__dirname,"..", "validators", "auth.validator.js"));

const blockDisposable = require(path.join(__dirname, "..", "utils", "blockDisposableMail.js"));
const checkMxMiddleware = require(path.join(__dirname, "..", "utils", "verifyMxRecord.js"));
const emailPolicy = require(path.join(__dirname, "..", "utils", "emailPolicy.js"));

const {createUser, verifyEmail, loginUser, logoutUser,
       authUser, forgotPassword, resetPassword, changeUserRole,
        getAllUsers, deleteUser, deleteUnverifiedUsers} = require(path.join(__dirname,"..", "controller", "authController.js"));

// create user
// api - /api/auth/allusers
router.get("/allusers", authMiddleware, verifyAdminUser, getAllUsers);

// create user
// api - /api/auth/signup
// 3 signups per hour per IP
router.post("/createuser",
  // emailPolicy,
  loginValidator, validate,
  contactLimiter, signupLimiter,
  blockDisposable, checkMxMiddleware,
  createUser
);

// verify user
// api - /api/verify/:token
// 3 signups per hour per IP
router.get("/verifybyemail/:token", contactLimiter, slowDownLimiter, verifyEmail);

// verify user
// api - /api/verify/:token
router.patch("/verifybyadmin/:token", contactLimiter, slowDownLimiter, authMiddleware, verifyAdminUser, verifyEmail);

// Change user role
// api - /api/verify/:token
router.patch("/changerole", contactLimiter, slowDownLimiter, authMiddleware, verifyAdminUser, changeUserRole);

// login user
// api - /api/auth/login
router.post("/login", 
  // 1️⃣ Validate request body 
  loginValidator, validate,
  // 2️⃣ Stop abuse ASAP
  // : Global API protection (5 requests/15min) | Brute force protection by email+IP (5 failed attempts/15min)
  contactLimiter, loginLimiter,
  // 3️⃣ Block disposable / invalid emails (cheap checks first)
  blockDisposable, checkMxMiddleware, 
  // 4️⃣ Controller (DB logic)
  loginUser
);

// logout user
// api - /api/auth/logout
router.get("/logout", logoutUser);

// logout user
// api - /api/auth/deleteUser
router.delete("/deleteUser/:id", contactLimiter, slowDownLimiter, authMiddleware, verifyAdminUser, deleteUser);

// logout user
// api - /api/auth/deleteUser
router.delete("/delete-unverified-users", contactLimiter, slowDownLimiter, authMiddleware, verifyAdminUser, deleteUnverifiedUsers);

// auth user
// api - /api/auth/auth
router.get("/admin", contactLimiter, authMiddleware, authUser);

// forgot password
// api - /api/auth/forgotPassword
router.post("/forgotPassword",
  // 1️⃣ Validate request body 
  forgotPasswordValidator, validate,
  // 2️⃣ Stricter brute force (3 attempts/hour)
  contactLimiter, forgotPasswordLimiter,
  // 3️⃣ Block disposable / invalid emails (cheap checks first)
  blockDisposable, checkMxMiddleware, 
  // 4️⃣ Controller (DB logic)
  forgotPassword  
);

// reset password
// api - /api/auth/resetPassword/:any
router.put("/resetPassword/:token",
  // 1️⃣ validate
  resetPasswordValidator, validate,
  // 2️⃣ Stop abuse ASAP
  // Prevent token guessing (5 attempts/hour per token)
  contactLimiter, resetPasswordLimiter,
  // 3️⃣ Validate request body
   validate,
  // 4️⃣ Controller (DB logic)
  resetPassword
);

module.exports = router;