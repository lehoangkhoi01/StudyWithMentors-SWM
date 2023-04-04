// import { useForm } from "react-hook-form";
// import {
//   INPUT_TYPES,
//   PROFILE_TITLES,
//   REGISTER_FIELD,
//   TEXTFIELD_LABEL,
// } from "../../../shared/constants/common";
import style from "./CV.module.scss";
// import CVSection from "./CVSection/CVSection";
// import ProgressImage from "./ProgressImage/ProgressImage";
import CVDetail from "./CVDetail/CVDetail";

const IS_EXIST_BACKGROUND = false;

// const TEXT_FIELDS = [
//   {
//     title: PROFILE_TITLES.INTRODUCION,
//     fields: [
//       {
//         type: INPUT_TYPES.TEXT_AREA,
//         name: TEXTFIELD_LABEL.DESCRIPION,
//         registerName: REGISTER_FIELD.INTRODUCION.DESCRIPTION,
//         optional: true,
//       },
//     ],
//   },
//   {
//     title: PROFILE_TITLES.EXPERIENCE,
//     fields: [
//       {
//         type: INPUT_TYPES.TEXT,
//         name: TEXTFIELD_LABEL.POSITION,
//         registerName: REGISTER_FIELD.EXPERIENCE.POSITION,
//       },
//       {
//         type: INPUT_TYPES.TEXT,
//         name: TEXTFIELD_LABEL.COMPANY,
//         registerName: REGISTER_FIELD.EXPERIENCE.COMPANY,
//       },
//       {
//         type: INPUT_TYPES.CHECK_BOX,
//         name: TEXTFIELD_LABEL.IS_WORKING_AT_THIS_POSITION,
//         registerName: REGISTER_FIELD.EXPERIENCE.POSITION,
//       },
//       {
//         type: INPUT_TYPES.DATE,
//         name: TEXTFIELD_LABEL.START_DATE,
//         registerName: REGISTER_FIELD.EXPERIENCE.START_TIME,
//       },
//       {
//         type: INPUT_TYPES.DATE,
//         name: TEXTFIELD_LABEL.END_DATE,
//         registerName: REGISTER_FIELD.EXPERIENCE.END_TIME,
//       },
//       {
//         type: INPUT_TYPES.TEXT_AREA,
//         name: TEXTFIELD_LABEL.DESCRIPION,
//         registerName: REGISTER_FIELD.EXPERIENCE.DESCRIPTION,
//         optional: true,
//       },
//     ],
//   },
//   {
//     title: PROFILE_TITLES.STUDY_PROGRESS,
//     fields: [
//       {
//         type: INPUT_TYPES.TEXT,
//         name: TEXTFIELD_LABEL.SCHOOL,
//         registerName: REGISTER_FIELD.STUDY_PROGRESS.SCHOOL,
//       },
//       {
//         type: INPUT_TYPES.TEXT,
//         name: TEXTFIELD_LABEL.MAJORS,
//         registerName: REGISTER_FIELD.STUDY_PROGRESS.MAJORS,
//       },
//       {
//         type: INPUT_TYPES.DATE,
//         name: TEXTFIELD_LABEL.START_DATE,
//         registerName: REGISTER_FIELD.STUDY_PROGRESS.START_TIME,
//       },
//       {
//         type: INPUT_TYPES.DATE,
//         name: TEXTFIELD_LABEL.COMPLETE_DATE,
//         registerName: REGISTER_FIELD.STUDY_PROGRESS.COMPLETED_TIME,
//         optional: true,
//       },
//       {
//         type: INPUT_TYPES.TEXT_AREA,
//         name: TEXTFIELD_LABEL.DESCRIPION,
//         registerName: REGISTER_FIELD.STUDY_PROGRESS.DESCRIPTION,
//         optional: true,
//       },
//     ],
//   },
//   {
//     title: PROFILE_TITLES.ACTIVITIES,
//     fields: [
//       {
//         type: INPUT_TYPES.TEXT,
//         name: TEXTFIELD_LABEL.ORGANIZATION_NAME,
//         registerName: REGISTER_FIELD.ACTIVITIES.ORGANIZATION_NAME,
//       },
//       {
//         type: INPUT_TYPES.TEXT,
//         name: TEXTFIELD_LABEL.POSITION,
//         registerName: REGISTER_FIELD.ACTIVITIES.POSITION,
//       },
//       {
//         type: INPUT_TYPES.CHECK_BOX,
//         name: TEXTFIELD_LABEL.IS_DOING_THIS_ACTIVITY,
//         registerName: REGISTER_FIELD.ACTIVITIES.IS_DOING,
//       },
//       {
//         type: INPUT_TYPES.DATE,
//         name: TEXTFIELD_LABEL.START_DATE,
//         registerName: REGISTER_FIELD.ACTIVITIES.START_TIME,
//       },
//       {
//         type: INPUT_TYPES.DATE,
//         name: TEXTFIELD_LABEL.END_DATE,
//         registerName: REGISTER_FIELD.ACTIVITIES.END_TIME,
//       },
//       {
//         type: INPUT_TYPES.TEXT_AREA,
//         name: TEXTFIELD_LABEL.DESCRIPION,
//         registerName: REGISTER_FIELD.ACTIVITIES.DESCRIPTION,
//         optional: true,
//       },
//     ],
//   },
//   {
//     title: PROFILE_TITLES.ACHIEVEMENT,
//     fields: [
//       {
//         type: INPUT_TYPES.TEXT,
//         name: TEXTFIELD_LABEL.ACHIEVEMENT_NAME,
//         registerName: REGISTER_FIELD.ACHIEVEMENT.NAME,
//       },
//       {
//         type: INPUT_TYPES.TEXT,
//         name: TEXTFIELD_LABEL.ORGANIZATION_NAME,
//         registerName: REGISTER_FIELD.ACHIEVEMENT.ORGANIZATION_NAME,
//       },
//       {
//         type: INPUT_TYPES.DATE,
//         name: TEXTFIELD_LABEL.RECEIVED_DATE,
//         registerName: REGISTER_FIELD.ACHIEVEMENT.RECEIVED_TIME,
//       },
//       {
//         type: INPUT_TYPES.TEXT_AREA,
//         name: TEXTFIELD_LABEL.DESCRIPION,
//         registerName: REGISTER_FIELD.ACHIEVEMENT.DESCRIPTION,
//         optional: true,
//       },
//     ],
//   },
//   {
//     title: PROFILE_TITLES.CERTIFICATES,
//     fields: [
//       {
//         type: INPUT_TYPES.TEXT,
//         name: TEXTFIELD_LABEL.CERTIFICATE_NAME,
//         registerName: REGISTER_FIELD.CERTIFICATES.NAME,
//       },
//       {
//         type: INPUT_TYPES.TEXT,
//         name: TEXTFIELD_LABEL.ORGANIZATION_NAME,
//         registerName: REGISTER_FIELD.CERTIFICATES.ORGANIZATION_NAME,
//       },
//       {
//         type: INPUT_TYPES.DATE,
//         name: TEXTFIELD_LABEL.ISSUED_DATE,
//         registerName: REGISTER_FIELD.CERTIFICATES.ISSUED_DATE,
//         optional: true,
//       },
//       {
//         type: INPUT_TYPES.TEXT,
//         name: TEXTFIELD_LABEL.DUE_DATE,
//         registerName: REGISTER_FIELD.CERTIFICATES.DUE_DATE,
//         optional: true,
//       },
//       {
//         type: INPUT_TYPES.TEXT_AREA,
//         name: TEXTFIELD_LABEL.DESCRIPION,
//         registerName: REGISTER_FIELD.CERTIFICATES.DESCRIPTION,
//         optional: true,
//       },
//     ],
//   },
//   {
//     title: PROFILE_TITLES.SKILLS,
//     fields: [
//       {
//         type: INPUT_TYPES.TEXT,
//         name: TEXTFIELD_LABEL.SKILL,
//         registerName: REGISTER_FIELD.SKILLS.NAME,
//       },
//       {
//         type: INPUT_TYPES.TEXT_AREA,
//         name: TEXTFIELD_LABEL.DESCRIPION,
//         registerName: REGISTER_FIELD.SKILLS.DESCRIPTION,
//         optional: true,
//       },
//     ],
//   },
// ];

const CV = () => {
  // const { register, setValue, watch, reset, getValues } = useForm();

  // const upsertHandler = (type) => {
  //   console.log(getValues());
  //   console.log(type);
  // };

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
          {/* <ProgressImage />
          {TEXT_FIELDS.map((textField, index) => (
            <CVSection
              key={`CV_SECTION_${index}`}
              register={register}
              setValue={setValue}
              getValues={getValues}
              watch={watch}
              reset={reset}
              textFields={textField.fields}
              title={textField.title}
              handleSubmit={upsertHandler}
            />
          ))} */}
          <CVDetail title={"Kinh nghiệm làm việc"} />
        </div>
      </div>
      <div className={style.cv__booking}></div>
    </div>
  );
};

export default CV;
