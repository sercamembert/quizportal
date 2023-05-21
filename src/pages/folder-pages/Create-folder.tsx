import { LoginPage } from "../login-pages/Login";
import { CreateForm } from "../../components/CreateForm";

import { auth } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export const CreateFolder = () => {
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
