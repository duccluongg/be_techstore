const { body } = require("express-validator")

module.exports = [
  body("username").notEmpty().withMessage("username_is_required"),
  body("password")
    .notEmpty()
    .withMessage("password_is_required")
    .isLength({ min: 3 })
    .withMessage("password_is_required_with_min_3_characters"),
  body("name").notEmpty().withMessage("name_is_required"),
]
