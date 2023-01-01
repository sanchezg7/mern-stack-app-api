import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import env from "./src/env.js";
import user from "./src/user/user.controller.js";
import category from "./src/category/category.controller.js";

const app = express();
app.use(cors({ origin: `${env.CLIENT_URL}` }));
app.use(bodyParser.json({
    limit: "5mb", // allow for image uploads
    type: "application/json"
}));
// don't allow wildcard cors
app.options('*', cors()); // preflight request for all routes

app.use(morgan(':method :url :response-time seconds'));

app.use("/api", user);
app.use("/api/category", category);

export default app;