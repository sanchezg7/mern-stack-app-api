import express from "express";
const controller = express();
import { userValidator } from "./user.viewmodel.js";
import { runValidation } from "../validate.js";
import { SES } from "@aws-sdk/client-ses";
import env from "../env.js";
import User from "./user.model.js";
// import {expressjwt as jwt} from "express-jwt";
import jwt from "jsonwebtoken";
import { registerEmailParams } from "./registration.js";

const ses = new SES({
    region: env.AWS_REGION
});

const sendEmail = (sendEmailCommandInput) => {
  return ses.sendEmail(sendEmailCommandInput);
};

controller.post("/register", userValidator, runValidation, (req, res) => {
    const { name, email, password } = req.body;
    let token;
    User.findOne({email}).exec((err, user) => {
       if(user) {
           return res.status(400).json({
               error: "Email is taken"
           });
       }
       // generate token with username email and password
        token = jwt.sign({ name, email, password }, env.JWT_ACCOUNT_ACTIVATION, {
            expiresIn: "10m" // minutes
        });

   const params = registerEmailParams(email, token);

   sendEmail(params)
        .then(data => {
            console.log("Email submitted to SES", data);
            res.json({
                data: `Email has been sent to ${email}, Follow the instructions to complete your registration`
            });
        })
        .catch(err => {
            console.error(err);
            res.json({
                data: `We could not verify your email. Please try again`
            });
        });
    });

});

export default controller;