import mongoose from 'mongoose'

const todoSchema = new mongoose.Schema(
    {
        title:String,
        description:String,
        done: Boolean,
        userId: String,
    },
        {
            timestamps:true
        }
    
)
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
})
export const User = mongoose.model('User', userSchema);

export  const Todo = mongoose.model('Todo',todoSchema)