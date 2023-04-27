import arrowImg from "../img/home-blocks/arrow.png";
import waveImg from "../img/home-blocks/wave.png";
import circleImg from "../img/home-blocks/circle.png";
import notebookImg from "../img/home-blocks/notebook.png";

export const Home = () => {
  return (
    <div className="home">
      <img src={notebookImg} alt="notebookImg" className="notebook" />
      <img src={arrowImg} alt="arrowImg" className="arrow" />
      <img src={waveImg} alt="waveImg" className="wave" />
      <img src={circleImg} alt="circleImg" className="circle" />
      <div className="home__container">
        <div className="home__heading">
          <span>
            Make it easy to learn big topics with flashcards and practice tests
          </span>
        </div>
        <span className="home__text">
          Join more than 60M+ worldwide using Quizportal flashcards, practice
          tests and games to achive their goals in school, univeristy and
          beyound.
        </span>
        <button className="home__btn">Get Started</button>
      </div>
    </div>
  );
};
