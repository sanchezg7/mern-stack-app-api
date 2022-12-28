import express from "express";
const controller = express();
import { categoryUpdateValidator, categoryCreateValidator } from "./category.vm.validator.js";
import { runValidation } from "../validate.js";
import {adminMiddleware, enrichContextWithUser, requireSignIn} from "../user/authentication.middleware.js";
import CategoryModel from "./category.model.js";
import slugify from "slugify";

controller.post("/", categoryCreateValidator, runValidation, requireSignIn, enrichContextWithUser, (req, res) => {
    const { name, image, content } = req.body;
    const slug = slugify(name);
    const theImage = {
        url: "https://via.placeholder.com/850x150.png?text=domain.com",
        key: "123"
    };

    const category = new CategoryModel({
        name,
        slug,
        image: theImage,
        content
    });
    category.postedBy = req.user._id;

    category.save((err, data) => {
       if(err) {
           const msg = "Category create failed";
           console.log(msg, err);
           res.status(500).json({
               message: msg
           })
       }
       res.json(data);
    });
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