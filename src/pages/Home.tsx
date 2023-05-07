//main imports
import React, { useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";
import { signInWithGoogle } from "../config/firebase";
import { Link, useNavigate } from "react-router-dom";

//home img
import arrowImg from "../img/home-blocks/arrow.png";
import waveImg from "../img/home-blocks/wave.png";
import circleImg from "../img/home-blocks/circle.png";
import notebookImg from "../img/home-blocks/notebook.png";
import downArrowImg from "../img/home-blocks/down-arrow.png";

//faq img
import busImg from "../img/faq-img/bus.png";
import studentsImg from "../img/faq-img/students.png";
import teacherImg from "../img/faq-img/teacher.png";
import { Footer } from "../components/Footer";

export const Home = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const navigate = useNavigate();
  const faqRef = useRef<HTMLDivElement>(null);
  const [user]: any = useAuthState(auth);
  const handleScrollToFAQ = () => {
    if (faqRef.current !== null) {
      faqRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div className="wrapper">
      <section className="home">
        <img src={notebookImg} alt="notebookImg" className="notebook" />
        <img src={arrowImg} alt="arrowImg" className="arrow" />
        <img src={waveImg} alt="waveImg" className="wave" />
        <img src={circleImg} alt="circleImg" className="circle" />
        <div className="home__container">
          <div className="home__heading">
            <span className="home__heading-text">
              Make it easy to learn big topics with flashcards and practice
              tests
            </span>
          </div>
          <span className="home__text">
            Join more than 60M+ worldwide using Quizportal flashcards, practice
            tests and games to achive their goals in school, univeristy and
            beyound.
          </span>
          <button
            className="home__btn"
            onClick={() => {
              !user ? signInWithGoogle() : navigate("/create-folder");
            }}
          >
            Get Started
          </button>
          <div className="home__scroll-container">
            <span className="home__scroll-text">
              90% of students who use Quizportal report receiving higher marks
            </span>
            <img
              src={downArrowImg}
              alt="scroll down"
              className="home__scroll-down"
              onClick={handleScrollToFAQ}
              tabIndex={0}
            />
          </div>
        </div>
      </section>
      <section ref={faqRef} className="faq" id="faq">
        <div className="faq__wrapper">
          <div className="faq__wrapper-item">
            <img src={busImg} alt="learn wherever" className="faq__img" />
          </div>
          <div className="faq__wrapper-item faq__wrapper-item--text">
            <span className="faq__title">
              With Quizportal learn <br /> wherever you are
            </span>
            <span className="faq__text">
              Flashcards are a portable and effective way to study, allowing you
              to learn wherever you are and make the most of your time.
            </span>
          </div>
          <div className="faq__wrapper-item faq__wrapper-item--replace">
            <img src={studentsImg} alt="learn wherever" className="faq__img" />
          </div>
          <div className="faq__wrapper-item faq__wrapper-item--text faq__wrapper-item--text--replace">
            <span className="faq__title">Create study set</span>
            <span className="faq__text">
              Whether you're studying for an exam or learning a new language.
              Creating new study sets can help you achieve your goals and
              succeed in your academic or personal pursuits.
            </span>
            <button className="faq__btn" type="submit">
              Create Set
            </button>
          </div>
          <div className="faq__wrapper-item faq__wrapper-item--card">
            <div className="faq__card">
              <div
                className={`flashcards__card ${isFlipped ? "flipped" : ""}`}
                onClick={() => setIsFlipped(!isFlipped)}
                style={{ minHeight: "350px" }}
              >
                <div className="front">
                  <p>Quizportal</p>
                </div>
                <div className="back">
                  <p>Learn less, know more.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="faq__teacher-wrapper">
          <img src={teacherImg} alt="teacher" />
          <div>
            <span className="faq__title faq__title--teacher">
              Are you a teacher?
            </span>
            <span className="faq__text faq__text--teacher">
              Flashcards are a powerful tool that teachers can use to motivate
              and engage their students in the learning process.
            </span>
            <button
              className="teacher-btn"
              onClick={() => {
                !user ? signInWithGoogle() : navigate("/create-folder");
              }}
            >
              Get Started
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};
