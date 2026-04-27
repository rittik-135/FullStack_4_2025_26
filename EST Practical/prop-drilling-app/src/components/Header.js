import React from "react";
import Navbar from "./Navbar";

function Header({ username }) {
  return (
    <div>
      <h2>Header Component</h2>
      <Navbar username={username} />
    </div>
  );
}

export default Header;