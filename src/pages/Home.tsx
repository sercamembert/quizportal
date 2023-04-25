import { auth, provider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
export const Home = () => {
  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
  };
  return (
    <div className="home">
      <button onClick={signInWithGoogle}>Login with google</button>
    </div>
  );
};
