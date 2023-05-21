/* eslint-disable jsx-a11y/alt-text */
import { FormEvent, useState } from "react";
import { passwordReset } from "../../config/firebase";
import waveImg from "../../img/home-blocks/wave.png";
import waveUpImg from "../../img/vectors/wave.svg";
import logoImg from "../../img/logo.png";
import { Link } from "react-router-dom";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [emailMessage, setEmailMessage] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await passwordReset(email);
      setEmailMessage(true);
    } catch (error: any) {
      if (error.code === "auth/user-not-found") {
        setError("User not found, try again!");
        setEmail("");
      }
    }
  };

  return (
    <div className="signup__wrapper">
      <img src={waveImg} alt="waveImg" className="signup-wave" />
      <object
        data={waveUpImg}
        type="image/svg+xml"
        className="signup-waveUp"
      ></object>
      {emailMessage ? (
        <div className="email-send">
          <h1>Reset password send check your inbox</h1>
          <Link to="/login" className="signup__message">
            Back to login
          </Link>
        </div>
      ) : (
        <>
          <form action="post" className="signup__form" onSubmit={handleSubmit}>
            <img src={logoImg} alt="quizportal.pl" />
            <div className="signup-input">
              <span className="signup-input__title">Email</span>
              <input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            {error && <p className="signup-input__error">{error}</p>}
            <button className="signup-btn">Reset password</button>
          </form>
        </>
      )}
    </div>
  );
};
