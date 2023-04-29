import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
interface CreateFormData {
  title: string;
  cards: {
    frontSite: string;
    backSite: string;
  }[];
}

export const CreateFolder = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const [cardsCount, setCardsCount] = useState(1);
  const schema = yup.object().shape({
    title: yup.string().required("You must add title"),
    cards: yup.array().of(
      yup.object().shape({
        frontSite: yup.string().required("You must add front page"),
        backSite: yup.string().required("You must add back page"),
      })
    ),
  });

  const { getValues, setValue } = useForm<CreateFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      cards: [{ frontSite: "", backSite: "" }],
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<CreateFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      cards: [{ frontSite: "", backSite: "" }],
    },
  });

  const onCreatePost = async (data: CreateFormData) => {
    const folderRef = await addDoc(collection(db, "Folders"), {
      username: user?.displayName,
      userId: user?.uid,
      title: data.title,
    });
    const folderId = folderRef.id;
    const cardsRef = collection(db, "Folders", folderId, "Flashcards");

    const cards = data.cards.map((card) => ({
      frontSite: card.frontSite,
      backSite: card.backSite,
      username: user?.displayName,
      userId: user?.uid,
    }));

    cards.forEach(async (card) => {
      const cardRef = await addDoc(cardsRef, card);
      await updateDoc(cardRef, { cardId: cardRef.id });
    });
    navigate(`/folder-flashcards/${folderId}`);
  };

  const handleAddCard = () => {
    setCardsCount((prevCount) => prevCount + 1);
  };

  const handleRemoveCard = (index: number) => {
    setCardsCount((prevCount) => prevCount - 1);
    const cards = getValues("cards");
    setValue(
      "cards",
      cards.filter((_: any, i: number) => i !== index)
    );
  };

  return (
    <div className="create">
      <form onSubmit={handleSubmit(onCreatePost)} className="form">
        <input type="text" placeholder="Title..." {...register("title")} />
        {Array.from({ length: cardsCount }).map((_, index) => (
          <div key={index} className="card">
            <input
              type="text"
              placeholder="Front content"
              {...register(`cards.${index}.frontSite` as const)}
            />
            <input
              type="text"
              placeholder="Back content"
              {...register(`cards.${index}.backSite` as const)}
            />
            {index > 0 && (
              <button type="button" onClick={() => handleRemoveCard(index)}>
                Remove
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={handleAddCard}>
          Add Card
        </button>
        <button>Submit</button>
      </form>
    </div>
  );
};
