import { check } from "express-validator";

const categoryCreateValidator = [
    check("name")
        .not()
        .isEmpty()
        .withMessage("Name is required."),
    check("image")
        .isEmpty()
        .withMessage("Image is required."),
    check("content")
        .isLength({ min: 20 })
        .withMessage("Content is required")
];

const categoryUpdateValidator = [
    check("name")
        .not()
        .isEmpty()
        .withMessage("Name is required."),
    check("content")
        .isLength({ min: 20 })
        .withMessage("Content is required")
];

export { categoryUpdateValidator, categoryCreateValidator };