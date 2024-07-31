import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

import todoRouter from "./routers/todoRouter.js";
import userRouter from "./routers/userRouter.js";

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));

app.get("/", (req, res) => {
    return res.status(200).send("Hello there!");
})

mongoose
    .connect(process.env.MONGO_CONNECTION_STRING)
    .then(() => {
        console.log("Database connected");

        app.listen(process.env.PORT, () => {
            console.log(`app is listening to port ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });

app.use("/user", userRouter);
app.use("/todo", todoRouter);

const errorHandler = (err, req, res, next) => {
    if(res.headersSent){
        return next(err);
    }
    else{
        res.status(500).json({error: err});
    }
};
    
app.use(errorHandler);