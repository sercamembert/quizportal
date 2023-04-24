import { auth, provider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
export const Home = () => {
  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result);
  };
  return <div className="home">Home</div>;
};
