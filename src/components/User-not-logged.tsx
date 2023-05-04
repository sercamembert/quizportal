import { signInWithPopup, signInWithRedirect } from "firebase/auth";
import { auth, provider } from "../config/firebase";
import { signInWithGoogle } from "../config/firebase";
export const UserNotLogged = () => {
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
