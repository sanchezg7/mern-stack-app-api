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

export { userValidator, onUserLoginValidator };