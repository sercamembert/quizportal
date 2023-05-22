import { LoginPage } from "../login-pages/Login";
import { CreateForm } from "../../components/CreateForm";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../config/firebase";
import { UserContext } from "../../config/userContext";
import { useContext } from "react";

export const EditFolder = () => {
  const user = useContext(UserContext);

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
