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
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
interface FlashcardI {
  frontSite: string;
  backSite: string;
}

interface FolderFlashcardsParams {
  folderId: string;
  [key: string]: string | undefined;
}

export const FolderFlashcards = () => {
  const { folderId } = useParams<FolderFlashcardsParams>();
  const [flashcards, setFlashcards] = useState<FlashcardI[]>([]);

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
  }, [folderId]);

  const deleteFolder = async () => {
    try {
      if (folderId != null) {
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
      <button onClick={deleteFolder}>delete folder</button>
    </div>
  );
};
