import app from "./app.js";
import env from "./src/env.js";
import mongoose from "mongoose";

const port = env.PORT || env.APP_PORT || 8080;

mongoose
    .connect(env.DATABASE, {})
    .then(() => console.log("DB Connected"))
    .catch(err => console.error("DB Error => ", err));

app.listen(port, () => {
   console.log("Running on Port: " + port);
});