import React from "react";
import UserProfile from "./UserProfile";

function Navbar({ username }) {
  return (
    <div>
      <h3>Navbar Component</h3>
      <UserProfile username={username} />
    </div>
  );
}

export default Navbar;