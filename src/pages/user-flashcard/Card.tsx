import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useEffect, useState } from "react";
import { Card as Icard } from "./Flashcards";
import { useAuthState } from "react-firebase-hooks/auth";

interface Props {
  card: Icard;
}

export const Card = (props: Props) => {
  const { card } = props;
  const [user] = useAuthState(auth);
  const cardsRef = collection(db, "Flashcards");
  const [isDeleted, setIsDeleted] = useState(false);
  const removeCard = async () => {
    const removeCardQuery = query(
      cardsRef,
      where("cardId", "==", card.id),
      where("userId", "==", user?.uid)
    );
    const cardToDeleteData = await getDocs(removeCardQuery);
    const cardId = cardToDeleteData.docs[0].id;
    const cardToDelete = doc(db, "Flashcards", cardId);
    await deleteDoc(cardToDelete);
    setIsDeleted(true);
  };
  if (isDeleted) {
    return null;
  }
  return (
    <div className="card">
      <h1>Front site: {card.frontSite}</h1>
      <h1>Back site: {card.backSite}</h1>
      <button onClick={removeCard}>Remove card from library</button>
    </div>
  );
};
