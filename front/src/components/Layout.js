// components/Layout.js
import React from "react";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="main-content" style={{ padding: "1rem" }}>
        {children}
      </div>
    </>
  );
};

export default Layout;
