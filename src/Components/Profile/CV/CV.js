import {
  INPUT_TYPES,
  PROFILE_TITLES,
  TEXTFIELD_LABEL,
} from "../../../shared/constants/common";
import style from "./CV.module.scss";
import CVSection from "./CVSection/CVSection";
import ProgressImage from "./ProgressImage/ProgressImage";

const IS_EXIST_BACKGROUND = false;

const TEXT_FIELDS = {
  introduction: [
    {
      type: INPUT_TYPES.TEXT_AREA,
      name: TEXTFIELD_LABEL.DESCRIPION,
      optional: true,
    },
  ],
  experience: [
    {
      type: INPUT_TYPES.TEXT,
      name: TEXTFIELD_LABEL.POSITION,
    },
    {
      type: INPUT_TYPES.TEXT,
      name: TEXTFIELD_LABEL.COMPANY,
    },
    {
      type: INPUT_TYPES.CHECK_BOX,
      name: TEXTFIELD_LABEL.IS_WORKING_AT_THIS_POSITION,
    },
    {
      type: INPUT_TYPES.DATE,
      name: TEXTFIELD_LABEL.START_DATE,
    },
    {
      type: INPUT_TYPES.DATE,
      name: TEXTFIELD_LABEL.END_DATE,
    },
    {
      type: INPUT_TYPES.TEXT_AREA,
      name: TEXTFIELD_LABEL.DESCRIPION,
      optional: true,
    },
  ],
  studyProgress: [
    {
      type: INPUT_TYPES.TEXT,
      name: TEXTFIELD_LABEL.SCHOOL,
    },
    {
      type: INPUT_TYPES.TEXT,
      name: TEXTFIELD_LABEL.MAJORS,
    },
    {
      type: INPUT_TYPES.DATE,
      name: TEXTFIELD_LABEL.START_DATE,
    },
    {
      type: INPUT_TYPES.DATE,
      name: TEXTFIELD_LABEL.COMPLETE_DATE,
      optional: true,
    },
    {
      type: INPUT_TYPES.TEXT_AREA,
      name: TEXTFIELD_LABEL.DESCRIPION,
      optional: true,
    },
  ],
  activities: [
    {
      type: INPUT_TYPES.TEXT,
      name: TEXTFIELD_LABEL.ORGANIZATION_NAME,
    },
    {
      type: INPUT_TYPES.TEXT,
      name: TEXTFIELD_LABEL.POSITION,
    },
    {
      type: INPUT_TYPES.CHECK_BOX,
      name: TEXTFIELD_LABEL.IS_DOING_THIS_ACTIVITY,
    },
    {
      type: INPUT_TYPES.DATE,
      name: TEXTFIELD_LABEL.START_DATE,
    },
    {
      type: INPUT_TYPES.DATE,
      name: TEXTFIELD_LABEL.END_DATE,
    },
    {
      type: INPUT_TYPES.TEXT_AREA,
      name: TEXTFIELD_LABEL.DESCRIPION,
      optional: true,
    },
  ],
  achievements: [
    {
      type: INPUT_TYPES.TEXT,
      name: TEXTFIELD_LABEL.ACHIEVEMENT_NAME,
    },
    {
      type: INPUT_TYPES.TEXT,
      name: TEXTFIELD_LABEL.ORGANIZATION_NAME,
    },
    {
      type: INPUT_TYPES.DATE,
      name: TEXTFIELD_LABEL.RECEIVED_DATE,
    },
    {
      type: INPUT_TYPES.TEXT_AREA,
      name: TEXTFIELD_LABEL.DESCRIPION,
      optional: true,
    },
  ],
  certificates: [
    {
      type: INPUT_TYPES.TEXT,
      name: TEXTFIELD_LABEL.CERTIFICATE_NAME,
    },
    {
      type: INPUT_TYPES.TEXT,
      name: TEXTFIELD_LABEL.ORGANIZATION_NAME,
    },
    {
      type: INPUT_TYPES.DATE,
      name: TEXTFIELD_LABEL.ISSUED_DATE,
      optional: true,
    },
    {
      type: INPUT_TYPES.TEXT,
      name: TEXTFIELD_LABEL.DUE_DATE,
      optional: true,
    },
    {
      type: INPUT_TYPES.TEXT_AREA,
      name: TEXTFIELD_LABEL.DESCRIPION,
      optional: true,
    },
  ],
  skills: [
    {
      type: INPUT_TYPES.TEXT,
      name: TEXTFIELD_LABEL.SKILL,
    },
    {
      type: INPUT_TYPES.TEXT_AREA,
      name: TEXTFIELD_LABEL.DESCRIPION,
      optional: true,
    },
  ],
};

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
          <CVSection
            textFields={TEXT_FIELDS.introduction}
            title={PROFILE_TITLES.INTRODUCION}
          />
          <CVSection
            textFields={TEXT_FIELDS.experience}
            title={PROFILE_TITLES.EXPERIENCE}
          />
          <CVSection
            textFields={TEXT_FIELDS.studyProgress}
            title={PROFILE_TITLES.STUDY_PROGRESS}
          />
          <CVSection
            textFields={TEXT_FIELDS.activities}
            title={PROFILE_TITLES.ACTIVITIES}
          />
          <CVSection
            textFields={TEXT_FIELDS.achievements}
            title={PROFILE_TITLES.ACHIEVEMENT}
          />
          <CVSection
            textFields={TEXT_FIELDS.certificates}
            title={PROFILE_TITLES.CERTIFICATES}
          />
          <CVSection
            textFields={TEXT_FIELDS.skills}
            title={PROFILE_TITLES.SKILLS}
          />
        </div>
      </div>
      <div className={style.cv__booking}></div>
    </div>
  );
};

export default CV;
