const { body } = require("express-validator");

module.exports = [
  body("username")
    .notEmpty()
    .withMessage("username_is_required"),
  body("password")
    .notEmpty()
    .withMessage("password_is_required")
    .isLength({ min: 3 })
    .withMessage("password_must_be_at_least_3_chars_long"),
];
