import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  collection,
  query,
  where,
  getDocs,
  CollectionReference,
} from "firebase/firestore";
import { db } from "../../config/firebase";

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

  useEffect(() => {
    const fetchFlashcards = async () => {
      console.log("Fetching flashcards...");
      const q = query(collection(db, `Folders/${folderId}/Flashcards`));
      const querySnapshot = await getDocs(q);
      const flashcardsData = querySnapshot.docs.map((doc) =>
        doc.data()
      ) as FlashcardI[];
      console.log("Flashcards data:", flashcardsData);
      setFlashcards(flashcardsData);
    };
    fetchFlashcards();
  }, [folderId]);

  return (
    <div>
      {flashcards.map((flashcard, index) => (
        <div key={index}>
          <h2>Flashcard {index + 1}</h2>
          <p>Front: {flashcard.frontSite}</p>
          <p>Back: {flashcard.backSite}</p>
        </div>
      ))}
    </div>
  );
};
