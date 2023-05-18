import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  doc,
  collection,
  getDocs,
  getDoc,
  writeBatch,
  query,
  where,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  handleAddCard,
  handleTextareaInput,
} from "../pages/folder-pages/folder-form-methods";
import { EditFlashcardsParams, CreateFormData } from "./Interfaces";

import { useAuthState } from "react-firebase-hooks/auth";

export const schema = yup.object().shape({
  title: yup.string().required("You must add title"),
  cards: yup.array().of(
    yup.object().shape({
      frontSite: yup.string().required("You must add front page"),
      backSite: yup.string().required("You must add back page"),
    })
  ),
});

export const CreateForm = () => {
  const navigate = useNavigate();
  const [textareaHeight, setTextareaHeight] = useState("auto");
  const [user] = useAuthState(auth);
  const [cardsCount, setCardsCount] = useState(2);
  const { folderId, cards } = useParams<EditFlashcardsParams>();
  const [folderUser, setFolderUser] = useState();
  const [foldersCount, setFoldersCount] = useState(0);
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

  useEffect(() => {
    const fetchCards = async () => {
      if (folderId !== null && folderId !== undefined) {
        const titleReF = doc(db, "Folders", folderId);
        const titleSnap = await getDoc(titleReF);
        const cardsRef = collection(db, "Folders", folderId, "Flashcards");
        const cardsSnap = await getDocs(cardsRef);
        const cardsData = cardsSnap.docs.map((doc) => doc.data());
        const mappedCardsData = cardsData.map((card) => ({
          frontSite: card.frontSite,
          backSite: card.backSite,
        }));
        setValue("cards", mappedCardsData);
        if (titleSnap && titleSnap.exists()) {
          setValue("title", titleSnap.data().title);

          setFolderUser(titleSnap.data().userId);
        }
        setCardsCount(mappedCardsData.length);
      }
    };
    fetchCards();

    const fetchFoldersCount = async () => {
      if (user) {
        const q = query(
          collection(db, "Folders"),
          where("userId", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);
        setFoldersCount(querySnapshot.size);
      }
    };

    fetchFoldersCount();
  }, [folderId, setValue, user]);

  const onCreatePost = async (data: CreateFormData) => {
    if (foldersCount <= 20) {
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

      setTimeout(() => {
        window.location.reload();
      }, 100);
    } else {
      alert("You reached limit of sets!");
    }
  };

  const onEditPost = async (data: CreateFormData) => {
    if (folderId != null && folderId !== undefined) {
      const { title, cards } = data;
      const cardsRef = collection(db, "Folders", folderId, "Flashcards");
      const existingCardsSnap = await getDocs(cardsRef);
      const existingCardsData = existingCardsSnap.docs.map((doc) => ({
        cardId: doc.id,
        frontSite: doc.data().frontSite,
        backSite: doc.data().backSite,
      }));
      const newCardsData = cards.map((card) => ({
        frontSite: card.frontSite,
        backSite: card.backSite,
      }));
      const cardsToDelete = existingCardsData.filter(
        (existingCard) =>
          !newCardsData.some(
            (newCard) =>
              newCard.frontSite === existingCard.frontSite &&
              newCard.backSite === existingCard.backSite
          )
      );
      const cardsToUpdate = existingCardsData.filter((existingCard) =>
        newCardsData.some(
          (newCard) =>
            newCard.frontSite === existingCard.frontSite &&
            newCard.backSite === existingCard.backSite
        )
      );
      const cardsToAdd = newCardsData.filter(
        (newCard) =>
          !existingCardsData.some(
            (existingCard) =>
              newCard.frontSite === existingCard.frontSite &&
              newCard.backSite === existingCard.backSite
          )
      );
      const batch = writeBatch(db);
      cardsToDelete.forEach((card) => {
        const cardRef = doc(cardsRef, card.cardId);
        batch.delete(cardRef);
      });
      cardsToUpdate.forEach((card) => {
        const newCardData = newCardsData.find(
          (c) => c.frontSite === card.frontSite && c.backSite === card.backSite
        );
        const cardRef = doc(cardsRef, card.cardId);
        batch.update(cardRef, newCardData);
      });
      cardsToAdd.forEach((card) => {
        batch.set(doc(cardsRef), card);
      });
      batch.update(doc(db, "Folders", folderId), { title });
      await batch.commit();
      navigate(`/folder-flashcards/${folderId}`);
      setTimeout(() => {
        window.location.reload();
      }, 100);
    }
  };

  const handleRemoveCard = (index: number) => {
    const cards = getValues("cards");
    const updatedCards = [...cards.slice(0, index), ...cards.slice(index + 1)];
    setValue("cards", updatedCards);
    setCardsCount(updatedCards.length);
  };
  return (
    <form
      onSubmit={
        folderId ? handleSubmit(onEditPost) : handleSubmit(onCreatePost)
      }
    >
      <h1 className="create__heading">
        {folderId ? "Edit study set" : "Create study set"}
      </h1>
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
              onInput={(event) => handleTextareaInput(event, setTextareaHeight)}
            />
            <textarea
              placeholder="DEFINITION"
              {...register(`cards.${index}.backSite` as const)}
              className="card__input"
              onInput={(event) => handleTextareaInput(event, setTextareaHeight)}
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
        {folderId ? "Save changes" : "Create"}
      </button>
    </form>
  );
};
