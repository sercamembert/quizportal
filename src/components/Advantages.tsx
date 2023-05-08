/* eslint-disable jsx-a11y/alt-text */
import booksImg from "../img/vectors/books.svg";
import triumphImg from "../img/vectors/triumph.svg";
import atomImg from "../img/vectors/atom.svg";
import graduationCapImg from "../img/vectors/graduation-cap.svg";
import waveImg from "../img/vectors/wave.svg";
import arrowImg from "../img/vectors/arrow.svg";

export const Advantages = () => {
  return (
    <section className="advantages">
      <object
        data={waveImg}
        type="image/svg+xml"
        className="advantages-wave"
      ></object>
      <object
        data={booksImg}
        type="image/svg+xml"
        className="advantages-books"
      ></object>
      <object
        data={arrowImg}
        type="image/svg+xml"
        className="advantages-arrow"
      ></object>
      <div className="advantages__list">
        <div className="advantages__list-item">
          <object data={graduationCapImg} type="image/svg+xml"></object>
          <span className="advantages__text">Increase your test score</span>
        </div>
        <div className="advantages__list-item">
          <object data={atomImg} type="image/svg+xml"></object>
          <span className="advantages__text">Assimilate more knowledge</span>
        </div>
        <div className="advantages__list-item">
          <object data={triumphImg} type="image/svg+xml"></object>
          <span className="advantages__text">Achieve your dream result</span>
        </div>
      </div>
    </section>
  );
};
