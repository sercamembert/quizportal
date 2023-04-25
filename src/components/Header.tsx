import { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
export const Header = () => {
  const [user] = useAuthState(auth);

  const navigate = useNavigate();
  const signUserOut = async () => {
    await signOut(auth);
    navigate("/");
  };

  return <div className="header"></div>;
};
