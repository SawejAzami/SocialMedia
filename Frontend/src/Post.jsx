import { useState } from "react";
import axios from "axios"
function Post({ post, setPosts,url }) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  // const url = "http://localhost:5000";
  let fetchPosts = async () => {
    try {
      const res = await axios.get(url + "/api/post/get");
      setPosts(res.data.post);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  async function addLike(postId) {
    try {
      if (!localStorage.getItem("userId")) {
        return;
      }
      const res = await axios.post(url + "/api/post/like", {
        userId: localStorage.getItem("userId"),
        postId: postId,
      });
      // console.log(res)
      fetchPosts();
    } catch (error) {
      console.log(error);
    }
  }

  function isLiked(post) {
    return post.likes.includes(localStorage.getItem("userId"));
  }

  function openComments() {
    setOpen((val) => !val);
  }

  async function addComments(postId) {
    try {
      if (!localStorage.getItem("userId")) {
        return;
      }
      const res = await axios.post(url + "/api/post/comment", {
        userId: localStorage.getItem("userId"),
        postId: postId,
        message: text,
      });
      // console.log(res)
      setText("");
      fetchPosts();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className="post-card">
        <h4>{post.username}</h4>

        {post.message && <p>{post.message}</p>}
        {post.image && <img src={post.image} alt="post" />}
        <div className="likeAndComments">
          <div>
            {isLiked(post) ? (
              <span
                className="likeColor"
                style={{ backgroundColor: "#6f77ed" }}
              >
                Like
              </span>
            ) : (
              <span onClick={() => addLike(post._id)} className="likeColor">
                Like
              </span>
            )}
            <span>{post.likes.length}</span>
          </div>
          <div style={{ cursor: "pointer" }} onClick={openComments}>
            comments
          </div>
        </div>
        {open && (
          <div
            style={{
              margin: "10px",
              border: "1px solid black",
              padding: "10px",
              borderRadius: "10px",
            }}
          >
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              style={{
                margin: "10px",
                border: "1px solid black",
                padding: "10px",
              }}
              type="text"
              placeholder="Enter your comments"
            />
            <button
              onClick={() => addComments(post._id)}
              style={{
                margin: "10px",
                border: "1px solid black",
                padding: "10px",
                cursor: "pointer",
              }}
            >
              Add
            </button>
            <div>
              {post.comments.length != 0 &&
                post.comments.map((comment, index) => (
                  <div
                    style={{
                      margin: "10px",
                      border: "1px solid black",
                      padding: "10px",
                    }}
                    key={index}
                  >
                    <div>Username: {comment.username}</div>
                    <div>Message: {comment.text}</div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
export default Post