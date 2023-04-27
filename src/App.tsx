import React from "react";
import "./scss/App.scss";
import { Home } from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";
import { CreateFlashcard } from "./pages/Create-flashcard";
import { Flashcards } from "./pages/user-flashcard/Flashcards";
import { Generate } from "./pages/Generate";

function App() {
  return (
    <div className="App">
      <div id="root">
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateFlashcard />} />
            <Route path="/flashcards" element={<Flashcards />} />
            <Route path="/generate" element={<Generate />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
