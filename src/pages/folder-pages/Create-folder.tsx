import { UserNotLogged } from "../../components/User-not-logged";
import { CreateForm } from "../../components/CreateForm";
import { useContext } from "react";
import { UserContext } from "../../config/userContext";

export const CreateFolder = () => {
  const user = useContext(UserContext);

  return (
    <div className="wrapper">
      <div className="create">{user ? <CreateForm /> : <UserNotLogged />}</div>
    </div>
  );
};
