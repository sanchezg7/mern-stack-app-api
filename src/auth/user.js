import express from "express";

const controller = express();

controller.post("/api/register", (req, res) => {
    res.json({
        data: "success on register endpoint"

    });
});

export default controller;