//main imports
import React, { useRef } from "react";

//home img
import arrowImg from "../img/home-blocks/arrow.png";
import waveImg from "../img/home-blocks/wave.png";
import circleImg from "../img/home-blocks/circle.png";
import notebookImg from "../img/home-blocks/notebook.png";
import downArrowImg from "../img/home-blocks/down-arrow.png";

//faq img
import cardImg1 from "../img/faq-cards/1.png";
import cardImg2 from "../img/faq-cards/2.png";
import cardImg3 from "../img/faq-cards/3.png";
import cardImg4 from "../img/faq-cards/4.png";

export const Home = () => {
  const faqRef = useRef<HTMLDivElement>(null);

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
          <button className="home__btn">Get Started</button>
          <div className="home__scroll-container">
            <span className="home__scroll-text">
              90% of students approve that thanks to Quizportal{" "}
              {window.innerWidth >= 1024 && <br />}
              they started getting better grades
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
        <div
          className="faq-card"
          style={{
            backgroundImage:
              "url('https://png.pngtree.com/thumb_back/fh260/background/20190223/ourmid/pngtree-fresh-chalkboard-stationery-ad-background-backgroundblackboardhand-paintedbooktextbookstationeryfreshknow-how-image_75849.jpg')",
          }}
        >
          <span className="faq-card__text">
            With Quizportal you can quickly and effectively acquire new
            knowledge
          </span>
        </div>
        <div
          className="faq-card"
          style={{
            backgroundImage:
              "url('https://img.freepik.com/darmowe-zdjecie/uklad-pustych-karteczek-samoprzylepnych_23-2148857217.jpg')",
          }}
        >
          <span className="faq-card__text">
            Memorise anything with free digital flashcards
          </span>
        </div>
        <div
          className="faq-card"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1557187666-4fd70cf76254?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60')",
          }}
        >
          <span className="faq-card__text">
            Ace your exams with Learn and Test
          </span>
        </div>
        <div
          className="faq-card"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1557177324-56c542165309?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
          }}
        >
          <span className="faq-card__text">
            Quizportal is the perfect study tool for a test
          </span>
        </div>
      </section>
    </div>
  );
};
