import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

interface FolderI {
  id: string;
  title: string;
  userId: string;
  username: string;
}

export const UserFolders = () => {
  const [user] = useAuthState(auth);
  const [folders, setFolders] = useState<FolderI[]>([]);

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
      {folders.map((folder) => (
        <div key={folder.id}>
          <Link to={`/folder-flashcards/${folder.id}`}>
            <h2>{folder.title}</h2>
          </Link>
        </div>
      ))}
    </div>
  );
};
