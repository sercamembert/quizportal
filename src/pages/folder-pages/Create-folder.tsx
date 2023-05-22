import { LoginPage } from "../login-pages/Login";
import { CreateForm } from "../../components/CreateForm";
import { useContext } from "react";
import { UserContext } from "../../config/userContext";

export const CreateFolder = () => {
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
