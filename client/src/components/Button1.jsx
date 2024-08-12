import React from "react";
import { usePop } from "../contextApi/PopContext";

const Button1 = ({ children }) => {
  return (
    <button type="submit" className="pay">
      {children}
    </button>
  );
};

export default Button1;
