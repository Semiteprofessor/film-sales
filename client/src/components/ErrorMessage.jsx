import React from "react";

const ErrorMessage = ({ message }) => {
  return (
    <div className="error-message">
      <span>⛔</span>
      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;
