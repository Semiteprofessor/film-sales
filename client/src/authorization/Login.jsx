import React, { useEffect, useState } from "react";
import { useAuth } from "../contextApi/AuthContext";
import Button1 from "../components/Button1";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const { loginUser, isAuthenticated, isLoading } = useAuth();

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }
    loginUser(email, password);
  };
  useEffect(() => {
    if (isAuthenticated && isLoading) navigate("/home", { replace: true });
  }, [isAuthenticated, isLoading, navigate]);
  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h1 className="title">Log in</h1>
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
        <Button1>Login</Button1>
        <p>
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
