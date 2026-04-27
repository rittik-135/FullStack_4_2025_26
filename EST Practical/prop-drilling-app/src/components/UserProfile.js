import React from "react";

function UserProfile({ username }) {
  return (
    <div>
      <h4>User Profile Component</h4>
      <p>Username: {username}</p>
    </div>
  );
}

export default UserProfile;