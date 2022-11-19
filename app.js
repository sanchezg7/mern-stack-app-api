import express from "express";
import user from "./src/user/user.controller.js";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import mongoose from "mongoose";
import env from "./src/env.js";
console.log(env);
const app = express();
app.use(cors({ origin: `${env.CLIENT_URL}` }));
app.use(bodyParser.json());
// don't allow wildcard cors
// app.use(cors());
app.options('*', cors()); // preflight request for all routes

app.use(morgan(':method :url :response-time seconds'));

app.use("/api", user);

export default app;