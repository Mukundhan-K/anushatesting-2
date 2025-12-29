const { body, param  } = require("express-validator");

exports.loginValidator = [
  body("email")
    .trim()
    .isEmail()
    .withMessage("Invalid email")
    .normalizeEmail(),

  body("password")
    .trim()
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters"),
];

/**
 * FORGOT PASSWORD
 * requires: email only
 */
exports.forgotPasswordValidator = [
  body("email")
    .trim()
    .isEmail()
    .withMessage("Invalid email")
    .normalizeEmail(),
];
 
/**
 * RESET PASSWORD VALIDATOR
 * expects:
 * req.params.token
 * req.body.password.main
 * req.body.password.confirm
 */
exports.resetPasswordValidator = [
  // token from URL params
  param("token")
    .trim()
    .notEmpty()
    .withMessage("Reset token is required"),

  // main password
  body("password.main")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters"),

  // confirm password
  body("password.confirm")
    .notEmpty()
    .withMessage("Confirm password is required")
    .custom((value, { req }) => {
      if (value !== req.body.password.main) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
];
