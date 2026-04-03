import { Link, useNavigate } from "react-router-dom";
import './App.css'
import { useState } from "react";
import axios from "axios"


export default function Login({setToken}) {
    const navigate=useNavigate()
    // const [token,setToken]=useState(null)
    const [data,setData]=useState({
        email:"",
        password:""
      })
      const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData((prev) => ({ ...prev, [name]: value }));
      };
       const onLogin = async (e) => {
         e.preventDefault();

         try {
           const url = "http://localhost:5000";
           const response = await axios.post(`${url}/api/user/login`, data);

           if (!response.data.success) {
             alert(response.data.message || "Login failed");
             return;
           }
           console.log(response)
           setToken(response.data.token);
           localStorage.setItem("token", response.data.token);
           localStorage.setItem("userId", response.data.user._id);

           navigate("/");
         } catch (error) {
           console.log(error);
         }
       };


  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>

        <form onSubmit={onLogin}>
          <input
          name="email"
            value={data.email}
            onChange={onChangeHandler}
            type="email"
            placeholder="Enter Email"
            required
          />
          <input
          name="password"
            value={data.password}
            onChange={onChangeHandler}
            type="password"
            placeholder="Enter Password"
            required
          />

          <button type="submit">Login</button>
        </form>

        <p>
          Don't have an account? <Link to="/signup">Signup</Link>
        </p>
      </div>
    </div>
  );
}
