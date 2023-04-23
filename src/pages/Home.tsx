import { auth, provider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";

export const Home = () => {
  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result);
  };
  return (
    <div className="home">
      <p className="home__p">
        Pingu Flashcards, is easy-to-use platform which allows you to quickly
        create custom flashcards tailored to your specific learning needs.
        Whether you're studying a new language, preparing for a test, or just
        trying to improve your memory, Pingu Flashcards has got you covered.
      </p>
      <span className="home__btn" onClick={signInWithGoogle}>
        Get started
      </span>
    </div>
  );
};
