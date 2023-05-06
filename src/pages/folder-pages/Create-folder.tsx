import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserNotLogged } from "../../components/User-not-logged";
import { handleAddCard, handleTextareaInput } from "./folder-form-methods";
export interface CreateFormData {
  title: string;
  cards: {
    frontSite: string;
    backSite: string;
  }[];
}

export const schema = yup.object().shape({
  title: yup.string().required("You must add title"),
  cards: yup.array().of(
    yup.object().shape({
      frontSite: yup.string().required("You must add front page"),
      backSite: yup.string().required("You must add back page"),
    })
  ),
});

export const CreateFolder = () => {
  const navigate = useNavigate();
  const [textareaHeight, setTextareaHeight] = useState("auto");
  const [user] = useAuthState(auth);
  const [cardsCount, setCardsCount] = useState(2);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    getValues,
    setValue,
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

  const handleRemoveCard = (index: number) => {
    setCardsCount((prevCount) => prevCount - 1);
    const cards = getValues("cards");
    setValue(
      "cards",
      cards.filter((_: any, i: number) => i !== index)
    );
  };

  return (
    <div className="wrapper">
      <div className="create">
        {user ? (
          <form onSubmit={handleSubmit(onCreatePost)}>
            <h1 className="create__heading">Create a new study set</h1>
            <input
              type="text"
              placeholder="Enter set title..."
              {...register("title")}
              className="create__title"
            />
            {Array.from({ length: cardsCount }).map((_, index) => (
              <div key={index} className="card">
                <div className="card__head">
                  <span className="card__number">{index + 1}</span>
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveCard(index)}
                      className="card__remove"
                    >
                      <i className="fa-solid fa-xmark"></i>
                    </button>
                  )}
                </div>
                <div className="card__inputs">
                  <textarea
                    placeholder="TERM"
                    {...register(`cards.${index}.frontSite` as const)}
                    className="card__input"
                    onInput={(event) =>
                      handleTextareaInput(event, setTextareaHeight)
                    }
                  />
                  <textarea
                    placeholder="DEFINITION"
                    {...register(`cards.${index}.backSite` as const)}
                    className="card__input"
                    onInput={(event) =>
                      handleTextareaInput(event, setTextareaHeight)
                    }
                  />
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleAddCard(setCardsCount)}
              className="card__add"
            >
              <span className="card__add-text">
                Add Card <i className="fa-solid fa-plus"></i>
              </span>
            </button>
            <button className="submit-btn" type="submit">
              Create
            </button>
          </form>
        ) : (
          <UserNotLogged />
        )}
      </div>
    </div>
  );
};
