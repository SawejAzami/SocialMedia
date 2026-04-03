
import { uploadOnCloudinary } from "../cloudinary/cloudinary.js";
import { Post } from "../Models/postModel.js";
import { User } from "../Models/userModel.js";


// const create=async(req,res)=>{
//     try {
//         const {message,userId,username}=req.body;
//         // console.log(message)
//        const localPath = req.file ? req.file.path : null;
//        console.log(localPath)
//        let imageUrl = "";
//         if (localPath) {
//            const cloudImage = await uploadOnCloudinary(localPath);
//           // cloudImage = await cloudinary.uploader.upload(req.file.path);
//            if (cloudImage && cloudImage.url) {
//              imageUrl = cloudImage.url;
//            }
//         }

//         const post = new Post({
//           image: imageUrl,
//           message: message || "",
//           userId: userId,
//           username: username,
//         });

//         await post.save()
//         return res.json({
//           success: true,
//           message: "Post created...",
          
//         });

//     } catch (error) {
//         console.log(error);
        
//         return res.json({
//             success:false,
//             message:"something went wrong"
//         })
//     }
// }

const create = async (req, res) => {
  try {
    const { message, userId, username } = req.body;

    let imageUrl = "";

    if (req.file) {
      const cloudImage = await uploadOnCloudinary(req.file.buffer);

      if (cloudImage && cloudImage.url) {
        imageUrl = cloudImage.url;
      }
    }

    const post = new Post({
      image: imageUrl,
      message: message || "",
      userId,
      username,
    });

    await post.save();

    return res.json({
      success: true,
      message: "Post created...",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getPost=async(req,res)=>{
    try {
        const post=await Post.find()
         return res.json({
           success: true,
           message: "All post",
           post
         });
    } catch (error) {
        return res.json({
          success: false,
          message: "something went wrong",
        });
    }
}
const like=async(req,res)=>{
    try {
        const {userId,postId}=req.body;
        // console.log(postId)
        const updatedPost = await Post.findByIdAndUpdate(
          postId,
          { $push: { likes: userId } },
          { returnDocument: "after" }, 
        );
        return res.json({
          success: true,
          message: "likes done!",
          updatedPost,
        });
    } catch (error) {
        return res.json({
          success: false,
          message: "something went wrong",
        });
    }
}
const comment = async (req, res) => {
  try {
    const { userId, postId , message} = req.body;
    // console.log(req.body)
    const user=await User.findById(userId)
    const updatedPost=await Post.findByIdAndUpdate(
      postId,
      {
        $push: {
          comments: {
            userId,
            text: message,
            username:user.username
          },
        },
      },
      { returnDocument: "after" },
    );
    return res.json({
      success: true,
      message: "comment done!",
      updatedPost
    });
  } catch (error) {
    console.log(error)
    return res.json({
      success: false,
      message: "something went wrong",
    });
  }
};
export { create, getPost, comment,like };