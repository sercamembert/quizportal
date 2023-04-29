import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

interface CreateFormData {
  frontSite: string;
  backSite: string;
}

export const CreateFlashcard = () => {
  const [user] = useAuthState(auth);

  const schema = yup.object().shape({
    frontSite: yup.string().required("You must add front page"),
    backSite: yup.string().required("You must add back page"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateFormData>({
    resolver: yupResolver(schema),
  });

  const cardsRef = collection(db, "Flashcards");

  const onCreatePost = async (data: CreateFormData) => {
    const newDocRef = await addDoc(cardsRef, {
      ...data,
      username: user?.displayName,
      userId: user?.uid,
    });
    await updateDoc(newDocRef, { cardId: newDocRef.id });
  };
  return (
    <div className="create">
      <form onSubmit={handleSubmit(onCreatePost)} className="form">
        <input
          type="text"
          placeholder="Front content"
          {...register("frontSite")}
        />
        <input
          type="text"
          placeholder="Back content"
          {...register("backSite")}
        />
        <button>Submit</button>
      </form>
    </div>
  );
};
