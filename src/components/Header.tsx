import { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
export const Header = () => {
  const [user] = useAuthState(auth);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const handleImageClick = () => {
    setShowDropdown(!showDropdown);
  };
  const signUserOut = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <div className="header">
      <span className="header__link">
        <Link to={"/"} className="header__link">
          HOME
        </Link>
      </span>
      <span className="header__link">
        <Link to={"/create"} className="header__link">
          CREATE
        </Link>
      </span>
      <span className="header__link">
        <Link to={"/generate"} className="header__link">
          GENERATE
        </Link>
      </span>
      <span className="header__link">
        <Link to={"/flashcards"} className="header__link">
          MY FLASHCARDS
        </Link>
      </span>
      <div className="header__img-container">
        <img
          src={user?.photoURL || ""}
          className="header__img"
          onClick={handleImageClick}
        />
        {showDropdown && (
          <div className="header__dropdown">
            <div className="header__user">
              <span className="header__username">{user?.displayName}</span>
            </div>
            <span className="header__dropdown-link">
              <Link
                to={"/flashcards"}
                className="header__dropdown-Link"
                onClick={handleImageClick}
              >
                MY FLASHCARDS
              </Link>
            </span>
            <span
              className="header__dropdown-link"
              onClick={() => {
                signUserOut();
                handleImageClick();
              }}
            >
              LOGOUT
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
