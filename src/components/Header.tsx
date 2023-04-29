import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth, provider } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import logo from "../img/logo.png";
import { signInWithPopup } from "firebase/auth";
export const Header = () => {
  const [user]: any = useAuthState(auth);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigate = useNavigate();

  const signUserOut = async () => {
    await signOut(auth);
    navigate("/");
  };

  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
  };

  return (
    <header className={!isScrolled ? "header" : "header header--scrolled"}>
      <div className="header__logo-container">
        <Link to="/">
          {" "}
          <img src={logo} alt="logo" className="logo" tabIndex={0} />
        </Link>
      </div>
      <nav className="header__links">
        <Link
          to="/"
          className={
            user ? "header__link" : " header__link header__link--mobile"
          }
          onClick={() => {
            setIsDropdownOpen(false);
          }}
        >
          Home
        </Link>
        <Link
          to="/"
          className="header__link header__link--mobile"
          onClick={() => {
            setIsDropdownOpen(false);
          }}
        >
          FAQ
        </Link>
        <Link
          to="/create-folder"
          className="header__link header__link--media-display header__link--background"
          onClick={() => {
            setIsDropdownOpen(false);
          }}
        >
          Create
        </Link>
        <Link to="/create">
          <div
            className="header__plus"
            tabIndex={0}
            onClick={() => {
              isDropdownOpen && setIsDropdownOpen(false);
            }}
          >
            +
          </div>
        </Link>
      </nav>
      <div
        className={
          user
            ? "header__profile"
            : "header__profile header__profile--logout-media"
        }
      >
        {!user ? (
          <div className="header__signIn">
            <span className="header__login" onClick={signInWithGoogle}>
              Login
            </span>
            <span className="header__signup" onClick={signInWithGoogle}>
              Sign up
            </span>
          </div>
        ) : (
          <div className="header__profile-image-container">
            <img
              src={user?.photoURL ?? ""}
              alt="user profile"
              className="header__profile header__profile-main"
              onClick={() => {
                setIsDropdownOpen(!isDropdownOpen);
              }}
              tabIndex={0}
            />
            {isDropdownOpen && (
              <nav className="dropdown">
                <div className="dropdown__profil">
                  <div className="dropdown__img">
                    <img
                      src={user?.photoURL}
                      alt="user profile"
                      className="header__profile header__profile--dropdown"
                    />
                  </div>
                  <div className="dropdown__user-details">
                    <span className="dropdown__username">
                      {user.displayName}
                    </span>
                    <span className="dropdown__email">{user.email}</span>
                  </div>
                </div>
                <div className="dropdown__link-container dropdown__link-container--border">
                  <Link
                    to="/create-folder"
                    className="dropdown__link"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    <i className="fa-solid fa-pencil dropdown__icon"></i>
                    Create
                  </Link>
                </div>
                <div className="dropdown__link-container">
                  <Link
                    to="/user-folders"
                    className="dropdown__link"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    <i className="fa-solid fa-bookmark dropdown__icon"></i>
                    My flashcards
                  </Link>
                </div>
                <div className="dropdown__link-container dropdown__link-container--border">
                  <span
                    onClick={() => {
                      setIsDropdownOpen(!isDropdownOpen);
                      signUserOut();
                    }}
                    tabIndex={0}
                    className="dropdown__link"
                  >
                    <i className="fa-solid fa-arrow-right-from-bracket"></i>
                    Log out
                  </span>
                </div>
              </nav>
            )}
          </div>
        )}
      </div>
    </header>
  );
};
