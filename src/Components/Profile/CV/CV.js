import {
  CV_REGISTER_NAME_PREFIX,
  INPUT_TYPES,
  PROFILE_TITLES,
  REGISTER_FIELD,
  TEXTFIELD_LABEL,
} from "../../../shared/constants/common";
import style from "./CV.module.scss";
import CVSection from "./CVSection/CVSection";
import ProgressImage from "./ProgressImage/ProgressImage";
import CVDetail from "./CVDetail/CVDetail";
import { useEffect, useState } from "react";
import {
  getRegisterNamePrefixFromTitle,
  mapCVSection,
} from "../../../Helpers/SpecificComponentHelper/CVHelper";
import { cvEndpoints } from "../../../Services/cvEndpoints";

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
        registerName: REGISTER_FIELD.EXPERIENCE.IS_WORKING,
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

// const DUMMY_CV = {
//   userProfileId: "123",
//   description:
//     "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
//   workingExps: [
//     {
//       index: "0",
//       position: "string",
//       company: "string",
//       startDate: "2020-02-13",
//       endDate: "2020-02-13",
//       description: "string",
//       workingHere: false,
//     },
//     {
//       index: "1",
//       position: "string",
//       company: "string",
//       startDate: "2020-02-13",
//       endDate: "2020-02-13",
//       description: "string",
//       workingHere: false,
//     },
//   ],
//   learningExps: [
//     {
//       index: "0",
//       school: "string",
//       major: "string",
//       startDate: "2020-02-13",
//       endDate: "2020-02-13",
//       description: "string",
//     },
//   ],
//   socialActivities: [
//     {
//       index: "0",
//       organization: "string",
//       position: "string",
//       startDate: "2020-02-13",
//       endDate: "2020-02-13",
//       description: "string",
//       attendingThis: false,
//     },
//   ],
//   achievements: [
//     {
//       index: "0",
//       name: "string",
//       organization: "string",
//       achievingDate: "2020-02-13",
//       description: "string",
//     },
//   ],
//   certificates: [
//     {
//       index: "0",
//       name: "string",
//       organization: "string",
//       achievingDate: "2020-02-13",
//       expiryDate: "2020-02-13",
//       description: "string",
//     },
//   ],
//   skills: [
//     {
//       index: "0",
//       name: "ABC thuộc Google",
//       description:
//         "Worem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
//     },
//     {
//       index: "1",
//       name: "ABC thuộc Google",
//       description:
//         "Worem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
//     },
//     {
//       index: "2",
//       name: "ABC thuộc Google",
//       description:
//         "Worem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
//     },
//   ],
// };

const INIT_CV = {
  userProfileId: "",
  description: "",
  workingExps: [],
  learningExps: [],
  socialActivities: [],
  achievements: [],
  certificates: [],
  skills: [],
};

const CV = () => {
  const [detail, setDetail] = useState(null);
  const [selectedTextFields, setSelectedTextFields] = useState();
  const [cvData, setCVData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getCVData = async () => {
      let CVDataFromBE = await cvEndpoints.getUserCV();

      if (
        CVDataFromBE.data === "" ||
        CVDataFromBE.data === [] ||
        CVDataFromBE.data === {}
      ) {
        CVDataFromBE = INIT_CV;
      }

      delete CVDataFromBE.userProfileId;

      convertNullToEmptyArrayProperty(CVDataFromBE);

      setCVData(CVDataFromBE);
    };

    getCVData();
  }, []);

  const upsertHandler = async (data, prefix) => {
    let prevCV = cvData;

    if (prefix === CV_REGISTER_NAME_PREFIX.INTRODUCION) {
      prevCV.description = data.description;
    } else if (data.index !== null) {
      prevCV[prefix][data.index] = data;
    } else {
      prevCV[prefix].push(data);
    }

    updateCVToBE(prevCV);
  };

  const editDetailData = (key, title, indexOfProperty) => {
    setDetail({
      indexOfProperty,
      key,
      title,
    });
    setSelectedTextFields(
      TEXT_FIELDS.find((field) => field.title === title).fields
    );
  };

  const onBackToList = () => {
    setDetail(null);
  };

  const onDeleteProperty = (title, index) => {
    const prefix = getRegisterNamePrefixFromTitle(title);

    let prevCV = cvData;

    prevCV[prefix].splice(index, 1);

    updateCVToBE(prevCV);
  };

  const updateCVToBE = async (prevCV) => {
    setIsLoading(true);

    const CVDataFromBE = await cvEndpoints.updateUserCV(prevCV);

    delete CVDataFromBE.userProfileId;

    convertNullToEmptyArrayProperty(CVDataFromBE);

    setCVData(CVDataFromBE);
    setIsLoading(false);
  };

  const convertNullToEmptyArrayProperty = (CVData) => {
    Object.keys(CVData).map((key) => {
      if (key === "description" && !CVData[key]) {
        CVData[key] = "";
      } else if (!CVData[key]) {
        CVData[key] = [];
      }
    });
  };

  return (
    <div className={style.cv__container}>
      {!isLoading && (
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
            {!detail && (
              <>
                <ProgressImage cvData={cvData} />
                {Object.keys(cvData).map((key, index) => {
                  return (
                    <CVSection
                      cvData={cvData[key]}
                      keyProperty={key}
                      indexOfProperty={index}
                      viewData={mapCVSection(cvData[key], index)}
                      editDetailData={editDetailData}
                      key={`CV_SECTION_${index}`}
                      textFields={TEXT_FIELDS[index].fields}
                      title={TEXT_FIELDS[index].title}
                      handleSubmit={upsertHandler}
                    />
                  );
                })}
              </>
            )}
            {detail && (
              <CVDetail
                editDetailData={editDetailData}
                onBackToList={onBackToList}
                data={cvData[detail.key]}
                viewData={mapCVSection(
                  cvData[detail.key],
                  detail.indexOfProperty
                )}
                title={detail.title}
                selectedTextFields={selectedTextFields}
                handleSubmit={upsertHandler}
                onDeleteProperty={onDeleteProperty}
              />
            )}
          </div>
        </div>
      )}

      <div className={style.cv__booking}></div>
    </div>
  );
};

export default CV;
