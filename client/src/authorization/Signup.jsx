import React, { useEffect, useState } from "react";
import { useAuth } from "../contextApi/AuthContext";
import Button1 from "../components/Button1";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const { loginUser, isAuthenticated, isLoading } = useAuth();

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name || !username || !email || !password || !dob || !phone) {
      alert("Please fill in all fields");
      return;
    }
    loginUser(name, username, email, password, dob, phone);
  };
  useEffect(() => {
    if (isAuthenticated && isLoading) navigate("/home", { replace: true });
  }, [isAuthenticated, isLoading, navigate]);
  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h1 className="title">Sign Up</h1>
        <div className="container">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="inputs"
          />
        </div>
        <div className="container">
          <label htmlFor="password">Password</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="inputs"
          />
        </div>
        <div className="container">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="inputs"
          />
        </div>
        <div className="container">
          <label htmlFor="password">Password</label>
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="inputs"
          />
        </div>
        <div className="container">
          <label htmlFor="email">DOB</label>
          <input
            type="text"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="inputs"
          />
        </div>
        <div className="container">
          <label htmlFor="password">Password</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="inputs"
          />
        </div>
        <Button1>Sign up</Button1>
        <p>
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
