import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const authMiddleware = async (req, res, next) => {
  const { token } = req.headers;
  // console.log("toke->",token)
  if (!token) {
    return res.json({
      success: false,
      message: "Not authorized Login again",
    });
  }
  try {
    const token_decode = jwt.verify(token, process.env.SECRET_KEY);
    req.userId = token_decode.id;
    next();
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error during verification",
    });
  }
};
export  {authMiddleware};
