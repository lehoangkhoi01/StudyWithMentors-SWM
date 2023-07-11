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
          <span>10 người theo dõi</span>
        </div>
        <div className={style.card__topic}>
          {!props.data.topics.length && (
            <div className={style.card__topic_item}>
              <span>Chưa có chủ đề</span>
            </div>
          )}
          {props.data.topics.map((topic, index) => (
            <>
              <div
                key={`MENTOR_CARD_${index}`}
                className={style.card__topic_item}
              >
                <img src={require("../../../assets/icons/mentor-pen.png")} />
                <span>{topic.name}</span>
              </div>
              <div
                key={`MENTOR_CARD_${index}`}
                className={style.card__topic_item}
              >
                <img src={require("../../../assets/icons/mentor-pen.png")} />
                <span>{topic.name}</span>
              </div>
              <div
                key={`MENTOR_CARD_${index}`}
                className={style.card__topic_item}
              >
                <img src={require("../../../assets/icons/mentor-pen.png")} />
                <span>{topic.name}</span>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MentorCard;
