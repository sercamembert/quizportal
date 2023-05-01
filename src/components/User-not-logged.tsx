import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../config/firebase";

export const UserNotLogged = () => {
  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
  };
  return (
    <>
      <div className="not-logged">
        <h1 className="no-folders__heading">You're not logged in</h1>
        <div>
          <span className="not-logged__login" onClick={signInWithGoogle}>
            Login
          </span>
          <span className="not-logged__signup" onClick={signInWithGoogle}>
            Sign up
          </span>
        </div>
      </div>
    </>
  );
};
