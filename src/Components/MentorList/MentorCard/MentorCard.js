import style from "./MentorCard.module.scss";
import { FOLLOW, MENTOR_CARD } from "../../../shared/constants/common";
import { Button } from "@mui/material";
import { useHistory } from "react-router-dom";
import { ROUTES } from "../../../shared/constants/navigation";

const MentorCard = (props) => {
  const history = useHistory();

  const handleNavigateProfile = (id) => {
    history.push(ROUTES.CV + "/" + id);
  };

  return (
    <div className={style.card__container}>
      <div className={style.card__follow}>
        <img
          src={require("../../../assets/icons/Follow-mentor.png")}
          alt="back-icon"
        />
        <span>{FOLLOW.FOLLOW}</span>
      </div>
      <div className={style.card__cover}>
        <img src={require("../../../assets/Mentor-cover.png")} />
      </div>
      <div className={style.card__avatar}>
        <img
          src={
            props.data.avatarUrl &&
            props.data.avatarUrl !== "avatarUrl" &&
            props.data.avatarUrl !== "string"
              ? props.data.avatarUrl
              : require("../../../assets/Mentor_img.png")
          }
        />
      </div>
      <div className={style.card__information}>
        <div className={style.card__name}>
          <p>
            <Button
              variant="text"
              className={style.card__name}
              onClick={() => handleNavigateProfile(props.data.mentorId)}
            >
              {props.data.fullName}
            </Button>
          </p>
          <p>{props.data.occupation}</p>
        </div>
        <div className={style.card__rating}>
          <div>
            <img
              src={require("../../../assets/icons/Mentor-rating-star.png")}
            />
            <span>
              {props.data.ratingString ?? 0} {MENTOR_CARD.RATING}
            </span>
          </div>
          <span>|</span>
          <span>
            {props.data.followers} {MENTOR_CARD.FOLLOWERS}
          </span>
        </div>
        <div className={style.card__topic}>
          {!props.data.topics.length && (
            <div className={style.card__topic_item}>
              <span>{MENTOR_CARD.DONT_HAVE_TOPIC}</span>
            </div>
          )}
          {props.data.topics.map((topic, index) => (
            <>
              {index < 3 && (
                <div
                  key={`MENTOR_ITEM_${index}`}
                  className={style.card__topic_item}
                >
                  <img src={require("../../../assets/icons/mentor-pen.png")} />
                  <span>{topic.name}</span>
                </div>
              )}
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MentorCard;
