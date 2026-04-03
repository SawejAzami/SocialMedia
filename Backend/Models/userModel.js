import mongoose from "mongoose";

const userShema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    post:{
        type:Object,
        default:[]
    },
})

export const User=mongoose.model("User",userShema)