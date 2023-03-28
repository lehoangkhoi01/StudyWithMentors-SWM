import { PROFILE_TITLES } from "../../../shared/constants/common";
import style from "./CV.module.scss";
import CVSection from "./CVSection/CVSection";
import ProgressImage from "./ProgressImage/ProgressImage";

const IS_EXIST_BACKGROUND = false;

const CV = () => {
  return (
    <div className={style.cv__container}>
      <div className={style.cv__detail}>
        <div
          className={style.cv__detail__information}
          style={{
            backgroundImage: IS_EXIST_BACKGROUND
              ? `url("https://i.stack.imgur.com/XNazg.png")`
              : null,
          }}
        >
          <div className={style.cv__detail__information_brief}>
            <div className={style.cv__detail__information_img}>
              <img src={require("../../../assets/sbcf-default-avatar.png")} />
              <div className={style.cv__detail__information_edit}>
                <img src={require("../../../assets/icons/pen-icon.png")} />
              </div>
            </div>
            <div>
              <h2>Nguyễn Văn A</h2>
              <p>Business Analyst tại CodeStringers</p>
            </div>
          </div>
        </div>
        <div className={style.cv__detail__profile}>
          <ProgressImage />
          <CVSection title={PROFILE_TITLES.INTRODUCION} />
          <CVSection title={PROFILE_TITLES.EXPERIENCE} />
          <CVSection title={PROFILE_TITLES.STUDY_PROGRESS} />
          <CVSection title={PROFILE_TITLES.ACTIVITIES} />
          <CVSection title={PROFILE_TITLES.ACHIEVEMENT} />
          <CVSection title={PROFILE_TITLES.CERTIFICATES} />
          <CVSection title={PROFILE_TITLES.SKILLS} />
        </div>
      </div>
      <div className={style.cv__detail}>
        <div
          className={style.cv__detail__information}
          style={{
            backgroundImage: IS_EXIST_BACKGROUND
              ? `url("https://i.stack.imgur.com/XNazg.png")`
              : null,
          }}
        >
          <div className={style.cv__detail__information_brief}>
            <div className={style.cv__detail__information_img}>
              <img src={require("../../../assets/sbcf-default-avatar.png")} />
              <div className={style.cv__detail__information_edit}>
                <img src={require("../../../assets/icons/pen-icon.png")} />
              </div>
            </div>
            <div>
              <h2>Nguyễn Văn A</h2>
              <p>Business Analyst tại CodeStringers</p>
            </div>
          </div>
        </div>
        <div className={style.cv__detail__profile}>
          <ProgressImage />
          <CVSection title={PROFILE_TITLES.INTRODUCION} />
          <CVSection title={PROFILE_TITLES.EXPERIENCE} />
          <CVSection title={PROFILE_TITLES.STUDY_PROGRESS} />
          <CVSection title={PROFILE_TITLES.ACTIVITIES} />
          <CVSection title={PROFILE_TITLES.ACHIEVEMENT} />
          <CVSection title={PROFILE_TITLES.CERTIFICATES} />
          <CVSection title={PROFILE_TITLES.SKILLS} />
        </div>
      </div>
    </div>
  );
};

export default CV;
