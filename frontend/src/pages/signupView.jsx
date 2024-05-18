/* eslint-disable no-unused-vars */
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React from "react";

export default function SignupView() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      username: username,
      password: password,
    };

    // const response = await axios.post("http://34.128.89.226:4000/signup", formData);
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/signuppppppppppppp`, formData);
    if (response.status === 200) {
      navigate("/login");
    } else {
      alert(response.data.message);
    }
  };
  return (
    <form onSubmit={handleFormSubmit}>
      <label>Username</label>
      <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} />
      <br/>
      <label>Password</label>
      <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
      <br/>
      <button type='submit'>Sign Up</button>
    </form>
  )
}
