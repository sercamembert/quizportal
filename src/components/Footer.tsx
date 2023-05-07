import logoImg from "../img/logo.png";
export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__wrapper">
        <div className="footer__img-container">
          <img src={logoImg} alt="logo" />
        </div>
        <div className="footer__socials">
          <i className="fa-brands fa-instagram"></i>
          <i className="fa-brands fa-tiktok"></i>
          <i className="fa-brands fa-twitter"></i>
        </div>
        <div className="footer__links">
          <span>About</span>
          <span>Flashcards</span>
          <span>Privacy</span>
          <span>Contact</span>
        </div>
        <div className="footer__copy">
          <span>Copyright © 2023 outofplace.space. All Rights Reserved</span>
        </div>
      </div>
    </footer>
  );
};
