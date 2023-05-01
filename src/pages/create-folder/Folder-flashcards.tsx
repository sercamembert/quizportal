import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  collection,
  query,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  writeBatch,
  getDoc,
} from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

interface FlashcardI {
  frontSite: string;
  backSite: string;
}

interface FolderI {
  title: string;
  username: string;
  userId: string;
}

interface FolderFlashcardsParams {
  folderId: string;
  [key: string]: string | undefined;
}

export const FolderFlashcards = () => {
  const { folderId } = useParams<FolderFlashcardsParams>();
  const [flashcards, setFlashcards] = useState<FlashcardI[]>([]);
  const [folder, setFolder] = useState<FolderI | null>(null);
  const [user]: any = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFlashcards = async () => {
      const q = query(collection(db, `Folders/${folderId}/Flashcards`));
      const querySnapshot = await getDocs(q);
      const flashcardsData = querySnapshot.docs.map((doc) =>
        doc.data()
      ) as FlashcardI[];
      setFlashcards(flashcardsData);
    };
    fetchFlashcards();

    const fetchFolder = async () => {
      if (folderId != null) {
        const folderRef = doc(db, "Folders", folderId);
        const folderSnapshot = await getDoc(folderRef);
        const folderData = folderSnapshot.data() as FolderI;
        setFolder(folderData);
      }
    };
    fetchFolder();
  }, [folderId]);

  const deleteFolder = async () => {
    try {
      console.log(folder?.userId);
      if (folderId != null && folder?.userId === user?.uid) {
        const folderRef = doc(db, "Folders", folderId);
        const flashcardsRef = collection(folderRef, "Flashcards");
        const querySnapshot = await getDocs(flashcardsRef);

        const batch = writeBatch(db);
        querySnapshot.forEach((doc) => {
          batch.delete(doc.ref);
        });
        await batch.commit();
        await updateDoc(folderRef, {
          Flashcards: [],
        });

        await deleteDoc(folderRef);
        navigate("/");
      }
    } catch (error) {
      console.error("Błąd podczas usuwania dokumentu: ", error);
    }
  };

  return (
    <div>
      {flashcards.map((flashcard, index) => (
        <div key={index}>
          <h2>Flashcard {index + 1}</h2>
          <p>Front: {flashcard.frontSite}</p>
          <p>Back: {flashcard.backSite}</p>
        </div>
      ))}
      {folder?.userId === user?.uid && (
        <button onClick={deleteFolder}>delete folder</button>
      )}
    </div>
  );
};
