import mongoose from "mongoose";

const postShema=new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    image:{
        type:String,
        
    },
    message:{
        type:String,
       
    },
    likes:{
        type:Object,
        default:[]
    },
    comments:{
        type:Object,
        default:[]
    },

})

export const Post = mongoose.model("Post", postShema);