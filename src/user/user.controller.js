import express from "express";
const controller = express();
import { userValidator } from "./user.viewmodel.js";
import { runValidation } from "../validate.js";
import { SES } from "@aws-sdk/client-ses";
import env from "../env.js";
import User from "./user.model.js";
import jwt from "jsonwebtoken";
import { registerEmailParams } from "./registration.js";
import shortid from "shortid";

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

   if(env.DISABLE_EMAILS === "1") {
        res.json({
            message: "Registered! Email stubbed.",
            token: token
        })
       return;
   }
   const params = registerEmailParams(email, token);

   sendEmail(params)
        .then(data => {
            console.log("Email submitted to SES", data);
            res.json({
                message: `Email has been sent to ${email}, Follow the instructions to complete your registration`
            });
        })
        .catch(err => {
            console.error(err);
            res.json({
                message: `We could not verify your email. Please try again`
            });
        });
    });

});

controller.post("/register/activate", (req, res) => {
    const { token } = req.body;
    // verify the token isn't expired
    jwt.verify(token, env.JWT_ACCOUNT_ACTIVATION, (err, decoded) => {
        if(err){
            return res.status(401).json({
                message: "Expired link. Try again"
            });
        }

        const { name, email, password } = jwt.decode(token);
        const username = shortid.generate();

        User.findOne({email}).exec((err, userSearchResult) => {
           if(userSearchResult){
               return res.status(401).json({
                   message: "Email is taken"
               })
           }

           // create new user
           const newUser = new User({username, name, email, password});
            newUser.save((err1, createdUser) => {
                if(err){
                    return res.status(500).json({
                        message: "Error saving user. Try again later"
                    });
                }

                return res.status(201).json({
                    message: "Registration was successful."
                });
           });
        });
    });
});

export default controller;