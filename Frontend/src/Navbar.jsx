import { Link, useNavigate } from "react-router-dom";
import "./Home.css";
import { useState } from "react";
import { useEffect } from "react";

export default function Navbar({token,setToken}) {
    const navigate=useNavigate()

    useEffect(()=>{
        setToken(localStorage.getItem("token"))
    },[token])

    function logout(){
        localStorage.clear()
        setToken(null)
        setTimeout(() => {
          navigate("/");
        }, 0);

    }
  return (
    <div className="container">
      <nav className="navbar">
        <h1 className="logo">SocialMedia</h1>

        {!token ? (
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </div>
        ) : (
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link onClick={logout}>logout</Link>
            <Link to="/profile" >Profile</Link>
          </div>
        )}
      </nav>
    </div>
  );
}
