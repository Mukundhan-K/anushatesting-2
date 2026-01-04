const path = require("path");
const router = require("express").Router();

const {contactLimiter} = require(path.join(__dirname,"..", "middleware", "contactLimiter.js"));
const {loginLimiter} = require(path.join(__dirname,"..", "middleware", "slowDownLimiter.js"));

const validate = require(path.join(__dirname,"..", "validators", "validate.js"));
const { contactValidator } = require(path.join(__dirname,"..", "validators", "contact.validator.js"));
const blockDisposable = require(path.join(__dirname,"..", "utils", "blockDisposableMail.js"));
const checkMxMiddleware = require(path.join(__dirname, "..", "utils", "verifyMxRecord.js"));

const {contactUs} = require(path.join(__dirname,"..", "controller", "contactController.js"));

// send mail
// api - /api/contact/sendMail

router.post("/sendMail", 
    contactValidator, validate,
    contactLimiter, loginLimiter, 
    blockDisposable, checkMxMiddleware,
    
    contactUs
);

module.exports = router;
