import { useForm } from "react-hook-form";
import {
  DATE_FORMAT,
  INPUT_TYPES,
  OTHERS,
  PROFILE_TITLES,
  REGISTER_FIELD,
  TEXTFIELD_LABEL,
} from "../../../shared/constants/common";
import style from "./CV.module.scss";
import CVSection from "./CVSection/CVSection";
import ProgressImage from "./ProgressImage/ProgressImage";
import CVDetail from "./CVDetail/CVDetail";
import { useEffect, useState } from "react";
import { convetDateFormat } from "../../../Helpers/dateHelper";

const IS_EXIST_BACKGROUND = false;

const TEXT_FIELDS = [
  {
    title: PROFILE_TITLES.INTRODUCION,
    fields: [
      {
        type: INPUT_TYPES.TEXT_AREA,
        name: TEXTFIELD_LABEL.DESCRIPION,
        registerName: REGISTER_FIELD.INTRODUCION.DESCRIPTION,
        optional: true,
      },
    ],
  },
  {
    title: PROFILE_TITLES.EXPERIENCE,
    fields: [
      {
        type: INPUT_TYPES.TEXT,
        name: TEXTFIELD_LABEL.POSITION,
        registerName: REGISTER_FIELD.EXPERIENCE.POSITION,
      },
      {
        type: INPUT_TYPES.TEXT,
        name: TEXTFIELD_LABEL.COMPANY,
        registerName: REGISTER_FIELD.EXPERIENCE.COMPANY,
      },
      {
        type: INPUT_TYPES.CHECK_BOX,
        name: TEXTFIELD_LABEL.IS_WORKING_AT_THIS_POSITION,
        registerName: REGISTER_FIELD.EXPERIENCE.POSITION,
      },
      {
        type: INPUT_TYPES.DATE,
        name: TEXTFIELD_LABEL.START_DATE,
        registerName: REGISTER_FIELD.EXPERIENCE.START_TIME,
      },
      {
        type: INPUT_TYPES.DATE,
        name: TEXTFIELD_LABEL.END_DATE,
        registerName: REGISTER_FIELD.EXPERIENCE.END_TIME,
      },
      {
        type: INPUT_TYPES.TEXT_AREA,
        name: TEXTFIELD_LABEL.DESCRIPION,
        registerName: REGISTER_FIELD.EXPERIENCE.DESCRIPTION,
        optional: true,
      },
    ],
  },
  {
    title: PROFILE_TITLES.STUDY_PROGRESS,
    fields: [
      {
        type: INPUT_TYPES.TEXT,
        name: TEXTFIELD_LABEL.SCHOOL,
        registerName: REGISTER_FIELD.STUDY_PROGRESS.SCHOOL,
      },
      {
        type: INPUT_TYPES.TEXT,
        name: TEXTFIELD_LABEL.MAJORS,
        registerName: REGISTER_FIELD.STUDY_PROGRESS.MAJORS,
      },
      {
        type: INPUT_TYPES.DATE,
        name: TEXTFIELD_LABEL.START_DATE,
        registerName: REGISTER_FIELD.STUDY_PROGRESS.START_TIME,
      },
      {
        type: INPUT_TYPES.DATE,
        name: TEXTFIELD_LABEL.COMPLETE_DATE,
        registerName: REGISTER_FIELD.STUDY_PROGRESS.COMPLETED_TIME,
        optional: true,
      },
      {
        type: INPUT_TYPES.TEXT_AREA,
        name: TEXTFIELD_LABEL.DESCRIPION,
        registerName: REGISTER_FIELD.STUDY_PROGRESS.DESCRIPTION,
        optional: true,
      },
    ],
  },
  {
    title: PROFILE_TITLES.ACTIVITIES,
    fields: [
      {
        type: INPUT_TYPES.TEXT,
        name: TEXTFIELD_LABEL.ORGANIZATION_NAME,
        registerName: REGISTER_FIELD.ACTIVITIES.ORGANIZATION_NAME,
      },
      {
        type: INPUT_TYPES.TEXT,
        name: TEXTFIELD_LABEL.POSITION,
        registerName: REGISTER_FIELD.ACTIVITIES.POSITION,
      },
      {
        type: INPUT_TYPES.CHECK_BOX,
        name: TEXTFIELD_LABEL.IS_DOING_THIS_ACTIVITY,
        registerName: REGISTER_FIELD.ACTIVITIES.IS_DOING,
      },
      {
        type: INPUT_TYPES.DATE,
        name: TEXTFIELD_LABEL.START_DATE,
        registerName: REGISTER_FIELD.ACTIVITIES.START_TIME,
      },
      {
        type: INPUT_TYPES.DATE,
        name: TEXTFIELD_LABEL.END_DATE,
        registerName: REGISTER_FIELD.ACTIVITIES.END_TIME,
      },
      {
        type: INPUT_TYPES.TEXT_AREA,
        name: TEXTFIELD_LABEL.DESCRIPION,
        registerName: REGISTER_FIELD.ACTIVITIES.DESCRIPTION,
        optional: true,
      },
    ],
  },
  {
    title: PROFILE_TITLES.ACHIEVEMENT,
    fields: [
      {
        type: INPUT_TYPES.TEXT,
        name: TEXTFIELD_LABEL.ACHIEVEMENT_NAME,
        registerName: REGISTER_FIELD.ACHIEVEMENT.NAME,
      },
      {
        type: INPUT_TYPES.TEXT,
        name: TEXTFIELD_LABEL.ORGANIZATION_NAME,
        registerName: REGISTER_FIELD.ACHIEVEMENT.ORGANIZATION_NAME,
      },
      {
        type: INPUT_TYPES.DATE,
        name: TEXTFIELD_LABEL.RECEIVED_DATE,
        registerName: REGISTER_FIELD.ACHIEVEMENT.RECEIVED_TIME,
      },
      {
        type: INPUT_TYPES.TEXT_AREA,
        name: TEXTFIELD_LABEL.DESCRIPION,
        registerName: REGISTER_FIELD.ACHIEVEMENT.DESCRIPTION,
        optional: true,
      },
    ],
  },
  {
    title: PROFILE_TITLES.CERTIFICATES,
    fields: [
      {
        type: INPUT_TYPES.TEXT,
        name: TEXTFIELD_LABEL.CERTIFICATE_NAME,
        registerName: REGISTER_FIELD.CERTIFICATES.NAME,
      },
      {
        type: INPUT_TYPES.TEXT,
        name: TEXTFIELD_LABEL.ORGANIZATION_NAME,
        registerName: REGISTER_FIELD.CERTIFICATES.ORGANIZATION_NAME,
      },
      {
        type: INPUT_TYPES.DATE,
        name: TEXTFIELD_LABEL.ISSUED_DATE,
        registerName: REGISTER_FIELD.CERTIFICATES.ISSUED_DATE,
        optional: true,
      },
      {
        type: INPUT_TYPES.TEXT,
        name: TEXTFIELD_LABEL.DUE_DATE,
        registerName: REGISTER_FIELD.CERTIFICATES.DUE_DATE,
        optional: true,
      },
      {
        type: INPUT_TYPES.TEXT_AREA,
        name: TEXTFIELD_LABEL.DESCRIPION,
        registerName: REGISTER_FIELD.CERTIFICATES.DESCRIPTION,
        optional: true,
      },
    ],
  },
  {
    title: PROFILE_TITLES.SKILLS,
    fields: [
      {
        type: INPUT_TYPES.TEXT,
        name: TEXTFIELD_LABEL.SKILL,
        registerName: REGISTER_FIELD.SKILLS.NAME,
      },
      {
        type: INPUT_TYPES.TEXT_AREA,
        name: TEXTFIELD_LABEL.DESCRIPION,
        registerName: REGISTER_FIELD.SKILLS.DESCRIPTION,
        optional: true,
      },
    ],
  },
];

const DUMMY_CV = {
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
  workingExps: [
    {
      position: "string",
      company: "string",
      startDate: "2020-02-13",
      endDate: "2020-02-13",
      description: "string",
      workingHere: false,
    },
  ],
  learningExps: [
    {
      school: "string",
      major: "string",
      startDate: "2020-02-13",
      endDate: "2020-02-13",
      description: "string",
    },
  ],
  socialActivities: [
    {
      organization: "string",
      position: "string",
      startDate: "2020-02-13",
      endDate: "2020-02-13",
      description: "string",
      attendingThis: false,
    },
  ],
  achievements: [
    {
      name: "string",
      organization: "string",
      achievingDate: "2020-02-13",
      description: "string",
    },
  ],
  certificates: [
    {
      name: "string",
      organization: "string",
      achievingDate: "2020-02-13",
      expiryDate: "2020-02-13",
      description: "string",
    },
  ],
  skills: [
    {
      name: "string",
      description: "string",
    },
  ],
};

const INDEX_OF_CV_PROPERTY = {
  DESCRIPTION: 0,
  WORKING_EXP: 1,
  LEARNING_EXPL: 2,
  SOCIAL_ACT: 3,
  ACHIEVEMENT: 4,
  CERT: 5,
  SKILL: 6,
};

const CV = () => {
  const { register, setValue, watch, reset, getValues } = useForm();
  const [detailData, setDetailData] = useState(null);
  const [detailTitle, setDetailTitle] = useState("");
  const [selectedTextFields, setSelectedTextFields] = useState();
  const [cvData, setCVData] = useState({});

  useEffect(() => {
    setCVData(DUMMY_CV);
  }, []);

  const upsertHandler = (type) => {
    console.log(getValues());
    console.log(type);
  };

  const editDetailData = (data, title) => {
    setDetailData(data);
    setDetailTitle(title);
    setSelectedTextFields(
      TEXT_FIELDS.find((field) => field.title === title).fields
    );
  };

  const onBackToList = () => {
    setDetailData(null);
    setDetailTitle("");
  };

  const mapCVSection = (data, indexOfProperty) => {
    switch (indexOfProperty) {
      case INDEX_OF_CV_PROPERTY.DESCRIPTION: {
        return [{ detail: data }];
      }

      case INDEX_OF_CV_PROPERTY.WORKING_EXP: {
        return data.map((section) => ({
          title: `${section.position} ${OTHERS.AT} ${
            section.company
          } (${convetDateFormat(
            section.startDate,
            DATE_FORMAT.YYYY_MM_DD,
            DATE_FORMAT.MM_YYYY
          )} - ${
            section.workingHere
              ? OTHERS.CURRENT
              : convetDateFormat(
                  section.endDate,
                  DATE_FORMAT.YYYY_MM_DD,
                  DATE_FORMAT.MM_YYYY
                )
          })`,
        }));
      }

      default:
        return null;
    }
  };

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
          {!detailData && (
            <>
              <ProgressImage cvData={cvData} />
              {TEXT_FIELDS.map((textField, index) => (
                <CVSection
                  cvData={cvData}
                  editDetailData={editDetailData}
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
              ))}
            </>
          )}
          {detailData && (
            <CVDetail
              editDetailData={editDetailData}
              register={register}
              setValue={setValue}
              getValues={getValues}
              watch={watch}
              reset={reset}
              onBackToList={onBackToList}
              data={detailData}
              title={detailTitle}
              selectedTextFields={selectedTextFields}
            />
          )}
        </div>
      </div>
      <div className={style.cv__booking}></div>
    </div>
  );
};

export default CV;
