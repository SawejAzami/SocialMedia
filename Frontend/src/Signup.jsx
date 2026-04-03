import { Link, useNavigate } from "react-router-dom";
import "./App.css";
import { useState } from "react";
import axios from "axios"

export default function Signup({url}) {
    const navigate=useNavigate()
        const [data,setData]=useState({
            username:"",
            email:"",
            password:""
          })
          const onChangeHandler = (e) => {
            const name = e.target.name;
            const value = e.target.value;
            setData((prev) => ({ ...prev, [name]: value }));
          };
           const signup = async (e) => {
                e.preventDefault();
                // const url="http://localhost:5000"
                const response = await axios.post(
                  `${url}/api/user/register`,
                  data
                );
                console.log(response)
               if(response.data.success){
                 navigate("/login")
               }
    
           }
  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Signup</h2>

        <form onSubmit={signup}>
          <input
            onChange={onChangeHandler}
            value={data.username}
            name="username"
            type="text"
            placeholder="Enter Name"
            required
          />
          <input
            onChange={onChangeHandler}
            value={data.email}
            name="email"
            type="email"
            placeholder="Enter Email"
            required
          />
          <input
            onChange={onChangeHandler}
            value={data.password}
            name="password"
            type="password"
            placeholder="Enter Password"
            required
          />

          <button type="submit">Signup</button>
        </form>

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
