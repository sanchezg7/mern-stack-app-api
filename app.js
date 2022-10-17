import express from "express";
import user from "./src/auth/user.js";

const app = express();

app.use("/api", user);

export default app;