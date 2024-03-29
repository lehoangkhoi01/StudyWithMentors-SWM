import { Link, useHistory } from "react-router-dom/cjs/react-router-dom";
import { DATE_FORMAT, SEMINAR } from "../../../shared/constants/common";
import style from "./SeminarCard.module.scss";
import { ROUTES_STATIC } from "../../../shared/constants/navigation";
import { Tooltip } from "@mui/material";
import { format } from "date-fns";

const SeminarCard = ({ data }) => {
  const history = useHistory();

  const handleNavigate = () => {
    history.push(`${ROUTES_STATIC.SEMINAR_DETAIL}/${data.id}`);
  };

  const renderStartEndTime = (startTime, endTime) => {
    if (startTime && endTime) {
      return `${format(new Date(startTime), DATE_FORMAT.HH_mm)} - ${format(
        new Date(endTime),
        DATE_FORMAT.HH_mm
      )}, ${format(new Date(startTime), DATE_FORMAT.DD_MM_YYYY)}`;
    } else return "Chưa có dữ liệu";
  };

  return (
    <div className={style.card__container}>
      <div className={style.card__header} onClick={handleNavigate}>
        <img
          className={style.card__image}
          src={
            data.imageLink
              ? data.imageLink
              : require("../../../assets/default-cover.jpg")
          }
        />
        {data.status === "FUTURE" && (
          <span className={style.card__status}>
            {SEMINAR.IS_COMMING_STATUS}
          </span>
        )}
      </div>

      <div className={style.card__information}>
        <Tooltip title={data.name}>
          <h1 className={style.card__title}>
            <Link to={`/seminars/${data.id}`}>{data.name}</Link>
          </h1>
        </Tooltip>
        <div className={style.card__item}>
          <img src={require("../../../assets/icons/Author_Seminar.png")} />
          <Tooltip
            title={data.mentors.map((mentor) => mentor.fullName).join(", ")}
          >
            <p>
              {data.mentors.map(
                (mentor, index) =>
                  `${mentor.fullName}${
                    data.mentors.length - 1 !== index ? ", " : ""
                  }`
              )}
            </p>
          </Tooltip>
        </div>
        <div className={style.card__item}>
          <img src={require("../../../assets/icons/Time_Seminar.png")} />
          <p>{renderStartEndTime(data.startTime, data.endTime)}</p>
        </div>
        <div className={style.card__item}>
          <img src={require("../../../assets/icons/Location_Semniar.png")} />
          <p>{data.location} </p>
        </div>
        <div className={style.card__item}>
          <img src={require("../../../assets/icons/Organizer_Seminar.png")} />
          <Tooltip title={data.department?.name}>
            <p>{data.department?.name}</p>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default SeminarCard;
