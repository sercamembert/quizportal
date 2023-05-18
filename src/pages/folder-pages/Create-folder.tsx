import { UserNotLogged } from "../../components/User-not-logged";
import { CreateForm } from "../../components/CreateForm";
import { useContext } from "react";

import { auth } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export const CreateFolder = () => {
  const [user] = useAuthState(auth);

  return (
    <div className="wrapper">
      <div className="create">{user ? <CreateForm /> : <UserNotLogged />}</div>
    </div>
  );
};
