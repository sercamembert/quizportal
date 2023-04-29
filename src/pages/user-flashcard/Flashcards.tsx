import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useEffect, useState } from "react";
import { Card } from "./Card";
import { useAuthState } from "react-firebase-hooks/auth";
export interface Card {
  id: string;
  userId: string;
  username: string;
  frontSite: string;
  backSite: string;
  cardId: string;
}
export const Flashcards = () => {
  const [user] = useAuthState(auth);
  const [cardsList, setCardsList] = useState<Card[] | null>(null);
  const cardsRef = collection(db, "Flashcards");
  const getCards = async () => {
    const data = await getDocs(cardsRef);
    setCardsList(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Card[]
    );
  };
  useEffect(() => {
    getCards();
  }, []);

  return (
    <div>
      {cardsList?.map((card) => {
        return user?.uid === card.userId && <Card card={card} />;
      })}
    </div>
  );
};
