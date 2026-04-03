
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Home';
import Navbar from './Navbar';
import Login from "./Login";
import Signup from "./Signup";
import { useState } from "react";
import Profile from "./Profile";

function App() {
      const [token,setToken]=useState(null)
  return (
    <>
      <Navbar token={token} setToken={setToken} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile setToken={setToken} />} />
      </Routes>
    </>
  );
  
}

export default App
