import React from "react";
import { usePop } from "../contextApi/PopContext";

const Button = ({ children }) => {
  const { openPay, setOpenPay } = usePop();
  return (
    <button className="pay" onClick={() => setOpenPay((openPay) => !openPay)}>
      {children}
    </button>
  );
};

export default Button;
