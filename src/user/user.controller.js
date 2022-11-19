import express from "express";
const controller = express();
import { userValidator } from "./user.viewmodel.js";
import { runValidation } from "../validate.js";

controller.post("/register", userValidator, runValidation, (req, res) => {
    res.json({
        data: "success on register endpoint"

    });
});

export default controller;