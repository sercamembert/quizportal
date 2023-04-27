import { auth, provider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import mainImg from "../img/main.jpg";
import phoneImg from "../img/phone.jpg";
import svg from "../img/svg.svg";
import svg2 from "../img/svg.svg";

export const Home = () => {
  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
  };

  return <div className="home"></div>;
};
