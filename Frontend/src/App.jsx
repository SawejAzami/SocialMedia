
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Home';
import Navbar from './Navbar';
import Login from "./Login";
import Signup from "./Signup";
import { useState } from "react";
import Profile from "./Profile";

function App() {
      const url = "https://socialmedia-backend-l2hq.onrender.com";
      const [token,setToken]=useState(null)
  return (
    <>
      <Navbar  token={token} setToken={setToken} />
      <Routes>
        <Route path="/" element={<Home url={url} />} />
        <Route
          path="/login"
          element={<Login url={url} setToken={setToken} />}
        />
        <Route path="/signup" element={<Signup url={url} />} />
        <Route
          path="/profile"
          element={<Profile url={url} setToken={setToken} />}
        />
      </Routes>
    </>
  );
  
}

export default App
