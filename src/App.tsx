import React, { useEffect, useMemo, useState } from "react";
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
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./config/firebase";
import { UserContext } from "./config/userContext";
import { User } from "firebase/auth";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userFromLocalStorage = localStorage.getItem("user");
    if (userFromLocalStorage) {
      setUser(JSON.parse(userFromLocalStorage));
    }
    setIsLoading(false);
  }, []);

  const memoizedUser = useMemo(() => user, [user]);

  return (
    <div className="App">
      <div id="root">
        <Router>
          <UserContext.Provider value={memoizedUser}>
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
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/userprofile" element={<UserProfilePage />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
            </Routes>
          </UserContext.Provider>
        </Router>
      </div>
    </div>
  );
}

export default App;
