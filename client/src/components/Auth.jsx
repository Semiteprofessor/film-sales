import React from "react";
import { Link } from "react-router-dom";

const Auth = () => {
  return (
    <div className="auth">
      <ul>
        <Link to="/register">
          <li>Sign Up</li>
        </Link>
        <Link to="/login">
          <li>Login</li>
        </Link>
      </ul>
    </div>
  );
};

export default Auth;
