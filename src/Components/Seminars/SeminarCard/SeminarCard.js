import { Link } from "react-router-dom/cjs/react-router-dom";
import { handleTimeToDisplay } from "../../../Helpers/dateHelper";
import { SEMINAR } from "../../../shared/constants/common";
import style from "./SeminarCard.module.scss";

const SeminarCard = ({ data }) => {
  return (
    <div className={style.card__container}>
      <div className={style.card__header}>
        <img
          className={style.card__image}
          src={
            data.imageLink
              ? data.imageLink
              : require("../../../assets/default-cover.jpg")
          }
        />
        {new Date(data.startTime) < new Date() && (
          <span className={style.card__status}>
            {SEMINAR.IS_COMMING_STATUS}
          </span>
        )}
      </div>

      <div className={style.card__information}>
        <h1 className={style.card__title}>
          <Link to={`/seminars/${data.id}`}>{data.name}</Link>
        </h1>
        <div className={style.card__item}>
          <img src={require("../../../assets/icons/Author_Seminar.png")} />
          <p>
            {data.mentors.map(
              (mentor, index) =>
                `${mentor.fullName} ${
                  data.mentors.length - 1 !== index ? "," : ""
                }`
            )}
          </p>
        </div>
        <div className={style.card__item}>
          <img src={require("../../../assets/icons/Time_Seminar.png")} />
          <p>{handleTimeToDisplay(data.startTime)}</p>
        </div>
        <div className={style.card__item}>
          <img src={require("../../../assets/icons/Location_Semniar.png")} />
          <p>{data.location}</p>
        </div>
        <div className={style.card__item}>
          <img src={require("../../../assets/icons/Organizer_Seminar.png")} />
          <p>{data.organizer}</p>
        </div>
      </div>
    </div>
  );
};

export default SeminarCard;
