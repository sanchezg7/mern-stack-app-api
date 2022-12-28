import express from "express";
const controller = express();
import { categoryUpdateValidator, categoryCreateValidator } from "./category.vm.validator.js";
import { runValidation } from "../validate.js";
import {adminMiddleware, enrichContextWithUser, requireSignIn} from "../user/authentication.middleware.js";
import CategoryModel from "./category.model.js";
import slugify from "slugify";
import formidable from "formidable";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import env from "../env.js";
import { v4 as uuidv4 } from 'uuid';

const s3 = new S3Client({
    region: env.AWS_REGION
})

controller.post("/", /*categoryCreateValidator, runValidation,*/ requireSignIn, enrichContextWithUser, async (req, res) => {
    // const { name, image, content } = req.body;
    const theImage = {
        url: "https://via.placeholder.com/850x150.png?text=domain.com",
        key: "123"
    };

    let form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
       if(err) {
           console.log(err);
           return res.status(400).json({
               message: "Image could not upload"
           });
       }
       const { image } = files;
       const { name, content } = fields;
       const slug = slugify(name);

        if(image.size > 2000000) {
            return res.status(400).json({
                message: "Image is too big in size. Less than 2 MB"
            });
        }

        const CATEGORY_DIRECTORY = "category";
        const key = `${uuidv4()}.jpg`;
        const params = {
            "Bucket": "mern-stack-g-123",
            "Key": `${CATEGORY_DIRECTORY}/${key}`,
            "Body": image.path,
            "ContentType": "image/jpg",
        };

        const BUCKET_NAME_REFACTOR_ME_TO_ENV = "mern-stack-g-123";
        const putObjCmd = new PutObjectCommand(params);
        s3.send(putObjCmd).then((data) => {
            // there is limited metadata provided by the output of the command
            console.log("AWS UPLOAD RES DATA", data);

            const category = new CategoryModel({
                name,
                slug,
                content
            });
            category.image.url = `https://${BUCKET_NAME_REFACTOR_ME_TO_ENV}.s3.amazonaws.com/${CATEGORY_DIRECTORY}/${key}`;
            category.image.key = key;
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
        }).catch(err => {
            if(err) {
                return res.status(500).json({
                    "message": "Image upload failed. Try again later."
                });
            }
        });
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