import bcrypt from "bcrypt";
import express from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

const router = express.Router();

router.post("/signup", async(req, res) => {
    try{
        // const user = new User({
        //     name: req.body.name,
        //     username: req.body.username,
        //     email: req.body.email,
        //     password: req.body.password
        // })

        const hashPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = {
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: hashPassword
        }
    
        const user = await User.create(newUser);
        return res.status(201).json(
            {
                message: "signup successful",
                user: user,
                
            }
        );
    }catch(err){
        
        console.log(err);
        res.status(400).send("There was a server side error!");
    }
});

router.post("/login", async(req, res) => {
    const user = await User.find({username: req.body.username});

    if(user){
        const isValidPassword = await bcrypt.compare(req.body.password, user[0].password);

        if(isValidPassword){
            const token = jwt.sign(
                {
                    username: user[0].username,
                    userId: user[0]._id,
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "1hrs",
                }
            );
        }
        else{
            res.status(402).send("password is not correct!");
        }
    }
    else{
        res.status(402).send("username is not correct!");
    }
})

export default router;