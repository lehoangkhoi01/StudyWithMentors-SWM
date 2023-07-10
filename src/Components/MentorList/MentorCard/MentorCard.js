import style from "./MentorCard.module.scss";
import { FOLLOW } from "../../../shared/constants/common";

const MentorCard = (props) => {
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
            props.data.avatarUrl && props.data.avatarUrl !== "avatarUrl"
              ? props.data.avatarUrl
              : require("../../../assets/Mentor_img.png")
          }
        />
      </div>
      <div className={style.card__information}>
        <div className={style.card__name}>
          <p>{props.data.fullName}</p>
          <p>{props.data.occupation}</p>
        </div>
        <div className={style.card__rating}>
          <div>
            <img
              src={require("../../../assets/icons/Mentor-rating-star.png")}
            />
            <span>4.8 sao</span>
          </div>
          <span>|</span>
          <span>100 Mentee</span>
          <span>|</span>
          <span>10 người theo dõi</span>
        </div>
        <div className={style.card__topic}>
          <div className={style.card__topic_item}>
            <img src={require("../../../assets/icons/mentor-pen.png")} />
            <span>Software Engineer - Nên bắt đầu từ đâu?</span>
          </div>
          <div className={style.card__topic_item}>
            <img src={require("../../../assets/icons/mentor-pen.png")} />
            <span>Phát triển bản thân trong thời kì 5.0</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorCard;
