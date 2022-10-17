import express from "express";
import user from "./src/user/user.controller.js";

const app = express();

app.use("/api", user);

export default app;