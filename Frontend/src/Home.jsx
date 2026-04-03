import { Link } from "react-router-dom";
import "./Home.css";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios"
import Post from "./Post";

export default function Home() {
  const [posts, setPosts] = useState([]);

  const url = "http://localhost:5000"; 
    let fetchPosts = async () => {
      try {
        const res = await axios.get(url + "/api/post/get");
        setPosts(res.data.post);
        // console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
  useEffect(() => {
    fetchPosts();
  }, []);
 

   
    
    

  return (
    <div className="home-container">
      <h2>All Posts</h2>

      {posts.length === 0 ? (
        <p>No posts available</p>
      ) : (
        posts.map((post, index) => (
          <Post post={post} key={index} setPosts={setPosts} />
        ))
      )}
    </div>
  );
}