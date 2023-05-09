import React from "react";
import "./scss/App.scss";
import { Home } from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";
import { CreateFolder } from "./pages/folder-pages/Create-folder";
import { UserFolders } from "./pages/folder-pages/User-folders";
import { FolderFlashcards } from "./pages/folder-pages/Folder-flashcards";
import { EditFolder } from "./pages/folder-pages/Edit-folder";
import { UserContext } from "./config/userContext";
import { auth } from "./config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
function App() {
  const [user] = useAuthState(auth);
  return (
    <div className="App">
      <div id="root">
        <Router>
          <UserContext.Provider value={user}>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/create-folder" element={<CreateFolder />} />
              <Route path="/user-folders" element={<UserFolders />} />
              <Route
                path="/folder-flashcards/:folderId"
                element={<FolderFlashcards />}
              />
              <Route
                path="/edit-flashcards/:folderId"
                element={<EditFolder />}
              />
            </Routes>
          </UserContext.Provider>
        </Router>
      </div>
    </div>
  );
}

export default App;
