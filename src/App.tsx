import React from "react";
import "./scss/App.scss";
import { Home } from "./pages/Home";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;
