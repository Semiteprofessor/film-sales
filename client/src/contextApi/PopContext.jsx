import { createContext, useContext, useState } from "react";

const PopContext = createContext();

const PopProvider = ({ children }) => {
  const [openPay, setOpenPay] = useState(false);
  return (
    <PopContext.Provider value={{ openPay, setOpenPay }}>
      {children}
    </PopContext.Provider>
  );
};

const usePop = () => {
  const context = useContext(PopContext);
  if (!context) {
    throw new Error("usePop must be used within a PopProvider");
  }
  return context;
};

export { PopProvider, usePop };
