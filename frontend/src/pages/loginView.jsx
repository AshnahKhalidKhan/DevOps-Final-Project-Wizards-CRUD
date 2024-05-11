/* eslint-disable no-unused-vars */
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React from "react";

export default function LoginView() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      username: username,
      password: password,
    };

    const response = await axios.post("http://34.128.89.226:4000/login", formData);
    const token = response.data.token;

    // Store the token in local storage
    localStorage.setItem('token', token);
    if (response.status === 200) {
      navigate("/wizards");
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
      <button type='submit'>Submit</button>
    </form>
  )
}
