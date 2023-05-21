import React from "react";
import "./scss/App.scss";
import { Home } from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";
import { CreateFolder } from "./pages/folder-pages/Create-folder";
import { UserFolders } from "./pages/folder-pages/User-folders";
import { FolderFlashcards } from "./pages/folder-pages/Folder-flashcards";
import { EditFolder } from "./pages/folder-pages/Edit-folder";
import { LoginPage } from "./pages/login-pages/Login";
import { SignUpPage } from "./pages/login-pages/Signup";
import { UserProfilePage } from "./pages/UserProfile";
import { ForgotPassword } from "./pages/login-pages/forgot-password";

function App() {
  return (
    <div className="App">
      <div id="root">
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-folder" element={<CreateFolder />} />
            <Route path="/user-folders" element={<UserFolders />} />
            <Route
              path="/folder-flashcards/:folderId"
              element={<FolderFlashcards />}
            />
            <Route path="/edit-flashcards/:folderId" element={<EditFolder />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/userprofile" element={<UserProfilePage />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
