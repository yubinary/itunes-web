import React from "react";
import MainContent from "./pages/MainContent.js";
import SideBar from "./pages/SideBar.js";
import "./styles/App.css";

function App() {
  return (
    <div className="app">
      <MainContent />
      <SideBar />
    </div>
  );
}

export default App;
