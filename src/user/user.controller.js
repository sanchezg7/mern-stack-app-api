import express from "express";
const controller = express();
import { userValidator } from "./user.viewmodel.js";
import { runValidation } from "../validate.js";
import { SES } from "@aws-sdk/client-ses";
import env from "../env.js";

const ses = new SES({
    region: env.AWS_REGION
});

const sendEmail = (sendEmailCommandInput) => {
  return ses.sendEmail(sendEmailCommandInput);
};

controller.post("/register", userValidator, runValidation, (req, res) => {
    const { name, email, password } = req.body;
    const params = {
        Source: env.EMAIL_FROM,
        Destination: {
            ToAddresses: [env.EMAIL_HARDCODE]
        },
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: `<html><body><h1>Hello ${name}</h1><p style="color:red">Test email.</p></body></html>`
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

export default controller;