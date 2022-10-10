import express from "express";

const app = express();

app.post("/api/register", (req, res) => {
    res.json({
        data: "success on register endpoint"

    });
});

export default app;