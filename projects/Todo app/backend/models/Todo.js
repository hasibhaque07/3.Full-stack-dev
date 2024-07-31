import mongoose from "mongoose";

const todoSchema =  mongoose.Schema(
    {
        todo: String,
        check: Boolean,
        user: {
            type: mongoose.Types.ObjectId,
            ref: "User"
        }
    }
)

export const Todo = mongoose.model("Todo", todoSchema);