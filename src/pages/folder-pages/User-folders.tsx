import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import { LoginPage } from "../login-pages/Login";
import { FolderI } from "../../components/Interfaces";
import { UserContext } from "../../config/userContext";
import LoadingSpinner from "../../components/Spinner";

export const UserFolders = () => {
  const [isLoading, setIsLoading] = useState(false);
  const user = useContext(UserContext);
  const [folders, setFolders] = useState<FolderI[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchFolders = async () => {
      setIsLoading(true);
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
      setIsLoading(false);
    };
    fetchFolders();
  }, [user]);

  return (
    <div>
      {isLoading ? (
        <LoadingSpinner />
      ) : folders.length > 0 ? (
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
            <LoginPage />
          )}
        </div>
      )}
    </div>
  );
};
