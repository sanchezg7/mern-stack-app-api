import app from "./app.js";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

app.use(morgan(':id :method :url :response-time'))
app.use(function (req, res, next) {
   console.log(req.url);
   next();
});
app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT || process.env.APP_PORT || 8080;

app.listen(port, () => {
   console.log("Running on Port: " + port);
});