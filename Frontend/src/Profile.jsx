import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import "./App.css";

export default function Profile({token,url}) {
    const [user,setUser]=useState({})
    // const url="http://localhost:5000"
    useEffect(() => {
      const fetchProfile = async () => {
        try {
          const token1 = localStorage.getItem("token");

          const response = await axios.get(url + "/api/user/profile", {
            headers: {token: token1 },
          });
          setUser(response.data.user)
        localStorage.setItem("userId", response.data.user._id);

        //   console.log(response.data);
        } catch (error) {
          console.log(error);
        }
      };

      fetchProfile();
    }, []);


  const [text, setText] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
  
      const formData = new FormData();
      formData.append("message", text);
      formData.append("userId", user._id); 
      formData.append("image", image); 
      formData.append("username", user.username); 
// console.log(text)
 console.log(image);
      const response = await axios.post(
        `${url}/api/post/create`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            token: token,
          },
        },
      );
     
      console.log(response);

      setText("");
      setImage(null);
    } catch (error) {
      console.log(error);
    }
  };

  

 return (
   <div className="main-container">
     <div className="left-sidebar">
       <div className="profile-card">
         <h2>Profile</h2>

         <p>
           <strong>Name:{user?.username}</strong>
         </p>
         <p>Email:{user?.email}</p>

       </div>
     </div>

     <div className="right-content">
       <div className="create-post">
         <h3>Create Post</h3>

         <form onSubmit={handleSubmit}>
           <textarea
             placeholder="What's on your mind?"
             value={text}
             onChange={(e) => setText(e.target.value)}
           />

           <input type="file" onChange={(e) => setImage(e.target.files[0])} />

           <button type="submit">Post</button>
         </form>
       </div>

       
     </div>
   </div>
 );
}
