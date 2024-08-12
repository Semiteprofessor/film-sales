import React from "react";

const NavBar = ({ children }) => {
  return (
    <nav>
      <div className="nav-container">{children}</div>
    </nav>
  );
};

export default NavBar;
