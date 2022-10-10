import app from "./app.js";

const port = process.env.PORT || process.env.APP_PORT || 8080;

app.listen(port, () => {
   console.log("Running on Port: " + port);
});