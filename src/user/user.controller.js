import express from "express";
const controller = express();
import { userValidator } from "./user.viewmodel.js";
import { runValidation } from "../validate.js";
import { SES } from "@aws-sdk/client-ses";
import env from "../env.js";
import User from "./user.model.js";
// import {expressjwt as jwt} from "express-jwt";
import jwt from "jsonwebtoken";

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


    const params = {
        Source: env.EMAIL_FROM,
        Destination: {
            ToAddresses: [env.EMAIL_HARDCODE]
        },
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: `
<html>
    <h1>Verify your email address</h1>
    <p>Please use the following linnk to complete your registration</p>
    <p>${env.CLIENT_URL}/auth/activate/${token}</p>
</html>`
                }
            },
            Subject: {
                "Charset": "UTF-8",
                "Data": "Complete your registration"
            }
        },
        ReplyToAddresses: [env.EMAIL_FROM]
    };
    sendEmail(params)
        .then(data => {
            console.log("Email submitted to SES", data);
            res.json({
                data: "success on register endpoint"
            });
        })
        .catch(err => {
            console.error(err)
            res.send("Email send failed");
        });

    });

});

export default controller;