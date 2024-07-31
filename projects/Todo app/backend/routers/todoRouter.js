import express from "express";
import { Todo } from "../models/Todo.js";

const router = express.Router();

router.post("/", async(req, res) => {
    try{
        const newTodo = {
            todo: req.body.todo,
            check: req.body.check,
            user: req.body.userId,
        }

        const todo = await Todo.create(newTodo);
        res.status(201).json({
            message: "todo inserted successfully!",
            todo: todo,
        })
    }catch(err){
        console.log(err);
        res.status(401).send("server side error");
    }
});

router.get("/", async(req, res) => {
    try{


        const todo = await Todo.find().populate("user");
        res.status(201).json({
            message: "todo got successfully",
            todo: todo,
        })
    }catch(err){
        console.log(err);
        res.status(401).send("server side error");
    }
})

export default router;