import React from "react";
import Header from "./components/Header";

function App() {
  const username = "Rittik"; // main data

  return (
    <div>
      <Header username={username} />
    </div>
  );
}

export default App;