import { Link, useHistory } from "react-router-dom/cjs/react-router-dom";
import { handleTimeToDisplay } from "../../../Helpers/dateHelper";
import { SEMINAR } from "../../../shared/constants/common";
import style from "./SeminarCard.module.scss";
import { ROUTES_STATIC } from "../../../shared/constants/navigation";
import { Tooltip } from "@mui/material";

const SeminarCard = ({ data }) => {
  const history = useHistory();

  const handleNavigate = () => {
    history.push(`${ROUTES_STATIC.SEMINAR_DETAIL}/${data.id}`);
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
          <p>
            {data.mentors.map(
              (mentor, index) =>
                `${mentor.fullName}${
                  data.mentors.length - 1 !== index ? ", " : ""
                }`
            )}
          </p>
        </div>

        {/* <div>
          {data.mentors.map((mentor) => {
            return (
              <div key={mentor.id}>
                <Avatar alt={mentor.fullName} src={mentor.avatarUrl} />
                <Typography>{mentor.fullName}</Typography>
              </div>
            );
          })}
        </div> */}
        <div className={style.card__item}>
          <img src={require("../../../assets/icons/Time_Seminar.png")} />
          <p>{handleTimeToDisplay(data.startTime)}</p>
        </div>
        <div className={style.card__item}>
          <img src={require("../../../assets/icons/Location_Semniar.png")} />
          <p>{data.location} </p>
        </div>
        <div className={style.card__item}>
          <img src={require("../../../assets/icons/Organizer_Seminar.png")} />
          <p>{data.department?.name}</p>
        </div>
      </div>
    </div>
  );
};

export default SeminarCard;
