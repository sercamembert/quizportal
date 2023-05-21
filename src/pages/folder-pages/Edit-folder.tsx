import { LoginPage } from "../login-pages/Login";
import { CreateForm } from "../../components/CreateForm";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../config/firebase";

export const EditFolder = () => {
  const [user] = useAuthState(auth);

  return (
    <>
      {user ? (
        <div className="wrapper">
          <div className="create">
            <CreateForm />
          </div>
        </div>
      ) : (
        <LoginPage />
      )}
    </>
  );
};
