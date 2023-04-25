import { collection, getDocs, doc } from "firebase/firestore";
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
  return (
    <div className="card">
      <h1>Front site: {card.frontSite}</h1>
      <h1>Back site: {card.backSite}</h1>
    </div>
  );
};
