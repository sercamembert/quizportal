import React from "react";
import "./scss/App.scss";
import { Home } from "./pages/Home";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  RouteProps,
  useLocation,
} from "react-router-dom";
import { Header } from "./components/Header";
import { Create } from "./pages/Create";
import { Flashcards } from "./pages/Flashcards";
import { Generate } from "./pages/Generate";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/flashcards" element={<Flashcards />} />
          <Route path="/generate" element={<Generate />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
