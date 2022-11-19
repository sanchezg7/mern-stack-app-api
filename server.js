import app from "./app.js";
import env from "./src/env.js";

const port = env.PORT || env.APP_PORT || 8080;

app.listen(port, () => {
   console.log("Running on Port: " + port);
});