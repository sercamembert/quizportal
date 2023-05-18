import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import { UserNotLogged } from "../../components/User-not-logged";
import { FolderI } from "../../components/Interfaces";

import { useAuthState } from "react-firebase-hooks/auth";

export const UserFolders = () => {
  const [user] = useAuthState(auth);
  const [folders, setFolders] = useState<FolderI[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchFolders = async () => {
      const q = query(
        collection(db, "Folders"),
        where("userId", "==", user?.uid)
      );
      const querySnapshot = await getDocs(q);
      const foldersData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as FolderI[];
      setFolders(foldersData);
    };
    fetchFolders();
  }, [user]);

  return (
    <div>
      {folders.length > 0 ? (
        <div className="folders">
          <h1 className="folders__heading">Created sets</h1>
          <div className="search"></div>
          {folders.map((folder) => (
            <Link
              to={`/folder-flashcards/${folder.id}`}
              className="folders__folder"
            >
              <div key={folder.id} className="folders__name">
                <span>{folder.title}</span>
                <i className="fa-solid fa-arrow-right"></i>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="no-folders">
          {user ? (
            <>
              <h1 className="no-folders__heading">
                You have not created any set
              </h1>
              <button
                className="submit-btn no-folders-btn"
                type="submit"
                onClick={() => navigate("/create-folder")}
              >
                Create
              </button>
            </>
          ) : (
            <UserNotLogged />
          )}
        </div>
      )}
    </div>
  );
};
