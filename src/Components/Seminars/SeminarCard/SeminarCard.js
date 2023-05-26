import {
  convertDateFormat,
  convertTimeToObject,
} from "../../../Helpers/dateHelper";
import { DATE_FORMAT } from "../../../shared/constants/common";
import style from "./SeminarCard.module.scss";

const SeminarCard = ({ data }) => {
  const handleTimeToDisplay = (fullDate) => {
    const [date, time] = fullDate.toString().split(" ");

    const timeObject = convertTimeToObject(time);
    const formatedDate = convertDateFormat(
      date,
      DATE_FORMAT.BACK_END_YYYY_MM_DD,
      DATE_FORMAT.DOT_DD_MM_YYYY
    );

    return `${timeObject.hour}:${timeObject.minute}, ${formatedDate}`;
  };

  return (
    <div className={style.card__container}>
      <div className={style.card__header}>
        <img
          className={style.card__image}
          src={require("../../../assets/Seminar_background.png")}
        />
        {new Date(data.startTime) < new Date() && (
          <span className={style.card__status}>Sắp diễn ra</span>
        )}
      </div>

      <div className={style.card__information}>
        <h1 className={style.card__title}>{data.name}</h1>
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
