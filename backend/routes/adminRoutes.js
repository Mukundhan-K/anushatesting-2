const path = require("path");
const router = require("express").Router();

const authMiddleware = require(path.join(__dirname,"..","middleware","authMiddleware.js"));

// const {contactLimiter} = require(path.join(__dirname,"..", "middleware", "contactLimiter.js"));
// const {loginLimiter} = require(path.join(__dirname,"..", "middleware", "slowDownLimiter.js"));
// const blockDisposable = require(path.join(__dirname, "..", "utils", "blockDisposableMail.js"));
// const checkMxMiddleware = require(path.join(__dirname, "..", "utils", "verifyMxRecord.js"));

const {loginStats, perUserloginStats, getProjectStats, getUserStats} = require(path.join(__dirname,"..", "controller", "adminController.js"));


// login Stats
// api - /api/analytics/logins
router.get("/logins",  authMiddleware, loginStats);

// per user login Stats
// api - /api/analytics/perlogins
router.get("/perlogins",  authMiddleware, perUserloginStats);

// Get Project Stats
// api - /api/analytics/getprojectstats
router.get("/getprojectstats",  authMiddleware, getProjectStats);

// Get User Stats
// api - /api/analytics/getuserstats
router.get("/getuserstats",  authMiddleware, getUserStats);

// add admin / editor log audit in future

module.exports = router;