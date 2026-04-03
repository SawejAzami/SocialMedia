import { User } from "../Models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const register=async(req,res)=>{
    try {
        const {username,email,password}=req.body;
        const user=await User.findOne({email})
        if(user){
             return res.json({
               success: false,
               message: "user already exist....",
             });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
          username: username,
          email: email,
          password: hashedPassword,
        });
        const newuser = await newUser.save();

         return res.json({
           success: true,
           message: "User created.",
           newuser
         });

    } catch (error) {
      console.log(error);
        return res.json({
            success:false,
            message:"user not created...."
        })
    }
}
const login=async(req,res)=>{
    try {
        const {email,password}=req.body
        const user=await User.findOne({email})
        if(!user){
             return res.json({
               success: false,
               message: "user does not found....",
             });
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
          return res.json({
            success: false,
            message: "Password is not correct",
          });
        }
        const id=user._id
        const token = jwt.sign( {id} , process.env.SECRET_KEY, { expiresIn: "1d" });


        // res.cookie("token", token, {
        //   httpOnly: true, 
        //   secure: false, 
        //   maxAge: 24 * 60 * 60 * 1000,
        // });

        return res.json({
          success: true,
          message: "user logged in successfully....",
          token,
          user
        });
        
    } catch (error) {
      console.log(error)
        return res.json({
            success:false,
            message:"something went wrong...."
        })
    }
}
const profile = async (req, res) => {
  try {
    const userId = req.userId;
    // console.log(userId);
    const user = await User.findById(userId);
    if (!user) {
      return res.json({
        success: false,
        message: "user does not found....",
      });
    }
    return res.json({
      success: true,
      message: "user  found....",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "something went wrong....",
    });
  }
};

export { login, register, profile };
