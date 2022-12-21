import { check } from "express-validator";

const userValidator = [
    check("name")
        .not()
        .isEmail()
        .withMessage("Name is required"),
    check("email")
        .isEmail()
        .withMessage("Must be a valid email address"),
    check("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long")
];

const onUserLoginValidator = [
    check("email")
        .isEmail()
        .withMessage("Must be a valid email address"),
    check("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long")
];

const forgotPasswordValidator = [
  check("email")
      .isEmail()
      .withMessage("Must be a valid email address")
];

const userRegisterValidator = [
  check("newPassword")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    check("resetPasswordLink")
        .not()
        .isEmpty()
        .withMessage("Token is required")
];

export { userValidator, onUserLoginValidator, forgotPasswordValidator };