/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import logo from "../img/logo.png";
import defaultUserImg from "../img/user.png";

export const Header = () => {
  const [user] = useAuthState(auth);
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

    function handleClickOutside(event: any) {
      const targetElement = event.target as HTMLElement;
      if (targetElement.closest(".header__profile-image-container") === null) {
        setIsDropdownOpen(false);
      }
    }

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navigate = useNavigate();

  const signUserOut = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <header className={!isScrolled ? "header" : "header header--scrolled"}>
      <div className="header__logo-container">
        <img
          src={logo}
          alt="logo"
          className="logo"
          tabIndex={0}
          onClick={() => {
            navigate("/");
            window.location.reload();
          }}
        />
      </div>
      <nav className="header__links">
        <Link
          to="/"
          className={
            user ? "header__link" : " header__link header__link--mobile"
          }
        >
          Home
        </Link>

        <Link
          to="/create-folder"
          className="header__link header__link--media-display header__link--background"
        >
          Create
        </Link>
        <Link to="/create-folder">
          <div className="header__plus" tabIndex={0}>
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
            <Link to="/login" className="header__login">
              Login
            </Link>
            <Link to="/signup" className="header__signup">
              Sign up
            </Link>
          </div>
        ) : (
          <div className="header__profile-image-container">
            <img
              src={user?.photoURL ?? defaultUserImg}
              alt="user profile"
              className="header__profile header__profile-main"
              tabIndex={0}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            />
            {isDropdownOpen && (
              <nav className="dropdown">
                <div className="dropdown__profil">
                  <div className="dropdown__img">
                    <img
                      src={user?.photoURL ?? defaultUserImg}
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
                    <span>Create</span>
                  </Link>
                </div>
                <div className="dropdown__link-container">
                  <Link
                    to="/user-folders"
                    className="dropdown__link"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    <i className="fa-solid fa-bookmark dropdown__icon"></i>
                    <span>My sets</span>
                  </Link>
                </div>
                <div className="dropdown__link-container dropdown__link-container--border">
                  <span
                    onClick={() => {
                      signUserOut();
                    }}
                    tabIndex={0}
                    className="dropdown__link"
                  >
                    <i className="fa-solid fa-arrow-right-from-bracket"></i>
                    <span>Log out</span>
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
