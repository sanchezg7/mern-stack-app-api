import express from "express";
const controller = express();
import { categoryUpdateValidator, categoryCreateValidator } from "./category.vm.validator.js";
import { runValidation } from "../validate.js";
import {adminMiddleware, requireSignIn} from "../user/authentication.middleware.js";

controller.post("/", categoryCreateValidator, runValidation, requireSignIn, (req, res) => {

});

// list
controller.get("/", (req, res) => {

});

controller.get("/category/:slug", () => {});
controller.put("/category/:slug", categoryUpdateValidator, runValidation, requireSignIn, adminMiddleware, (req, res) => {

});
controller.delete("/category/:slug", requireSignIn, adminMiddleware, (req, res) => {

});

export default controller;