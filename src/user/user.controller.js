import express from "express";
const controller = express();
import {onUserLoginValidator, userValidator} from "./user.viewmodel.js";
import { runValidation } from "../validate.js";
import { SES } from "@aws-sdk/client-ses";
import env from "../env.js";
import User from "./user.model.js";
import jwt from "jsonwebtoken";
import { registerEmailParams } from "./registration.js";
import shortid from "shortid";
import {requireSignIn} from "./authentication.js";

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
            expiresIn: "10m", // minutes,
            algorithm: "HS256"
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

controller.post("/login", onUserLoginValidator, runValidation, (req, res) => {
   const { email, password } = req.body;

   User.findOne({email}).exec((err, user) => {
      if(err || !user) {
          return res.status(404).json({
              message: "Unable to authenticate."
          });
      }
      if(!user.authenticate(password)) {
          return res.status(404).json({
              message: "Unable to authenticate."
          });
      }
      // generate token and send to client
       const token = jwt.sign({ _id: user._id }, env.JWT_SECRET, {
           expiresIn: "7d",
           algorithm: "HS256"
       });
      const {_id, name, email, hashed_password, role } = user;

      return res.json({
        token,
        user:  {_id, name, email, hashed_password, role }
      });
   });
});

// kepted only for example
// controller.get("/secret", requireSignIn, (req, res) => {
//    res.json({
//       data: "This is the secret page for logged in users only"
//    });
// });

export default controller;