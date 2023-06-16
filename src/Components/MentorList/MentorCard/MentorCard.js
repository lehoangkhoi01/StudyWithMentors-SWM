import style from "./MentorCard.module.scss";
import { FOLLOW, PROFILE_TITLES } from "../../../shared/constants/common";

const MentorCard = () => {
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
        <img src={require("../../../assets/Mentor_img.png")} />
      </div>
      <div className={style.card__information}>
        <div className={style.card__name}>
          <p>Hoàng Lê Khang</p>
          <p>Software Engineer tại FPT software</p>
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
        <div className={style.card__skill}>
          <p>{PROFILE_TITLES.SKILLS}: </p>
          <p className={style.card__skill_yellow}>FE Developer</p>
          <p className={style.card__skill_white}>Leadership</p>
          <p className={style.card__skill_gray}>+5</p>
        </div>
      </div>
    </div>
  );
};

export default MentorCard;
