import {
  ADD_TOPIC,
  BUTTON_LABEL,
  CV_MENTOR,
  CV_REGISTER_NAME_PREFIX,
  DATE_FORMAT,
  ERROR_MESSAGES,
  INPUT_TYPES,
  OTHERS,
  PROFILE_TITLES,
  REGISTER_FIELD,
  TEXTFIELD_LABEL,
  USER_STATUS,
  VALID_IMAGE_FILE_TYPE,
} from "../../../shared/constants/common";
import style from "./CV.module.scss";
import CVSection from "./CVSection/CVSection";
import ProgressImage from "./ProgressImage/ProgressImage";
import CVDetail from "./CVDetail/CVDetail";
import { useEffect, useState } from "react";
import {
  findLastestWorkingExp,
  getRegisterNamePrefixFromTitle,
  mapCVSection,
} from "../../../Helpers/SpecificComponentHelper/CVHelper";
import { cvEndpoints } from "../../../Services/cvEndpoints";
import {
  useCustomLoading,
  useNotification,
} from "../../../Helpers/generalHelper";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../../../Store/slices/userSlice";
import ConfirmImage from "../../Modal/ImageCrop/ConfirmImage";
import { userAccountService } from "../../../Services/userAccountService";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { ROUTES } from "../../../shared/constants/navigation";
import CustomizedButton from "../../../shared/components/Button/CustomizedButton";
import { SYSTEM_ROLE } from "../../../shared/constants/systemType";
import BookingDialog from "../../BookingProcess/BookingDialog/BookingDialog";
import { topicService } from "../../../Services/topicService";
import { Box, Divider, Tab, Tabs, Typography } from "@mui/material";
import moment from "moment";
import { scheduleService } from "../../../Services/sheduleService";
import { format } from "date-fns";
import TimeSlots from "./TimeSlots/TimeSlots";
import { followMentorService } from "../../../Services/followMentorService";
import { styled } from "@mui/material/styles";
import { meetingFeedbackService } from "../../../Services/meetingFeedbackService";
import RatingSection from "./RatingSection/RatingSection";
import { seminarService } from "../../../Services/seminarService";
import SeminarSection from "./SeminarSection/SeminarSection";

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
        type: INPUT_TYPES.DATE,
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

const PROFILE_SECTION = {
  PROFILE: "Profile",
  RATING: "Rating",
  SEMINAR: "Seminar",
};

const CustomTab = styled(Tab)`
  color: #3948ab;
  font-size: 1.3rem;
  &.Mui-selected {
    color: #283493;
  }
  background: white;
`;

const CV = () => {
  const [detail, setDetail] = useState(null);
  const [selectedTextFields, setSelectedTextFields] = useState();
  const [cvData, setCVData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [croppingImage, setCroppingImage] = useState();
  const [eventfile, setEventFile] = useState({});
  const [position, setPosition] = useState(null);
  const [openBookingInfoDialog, setOpenBookingInfoDialog] = useState(false);
  const [mentorId, setMentorId] = useState();
  const [hotTopics, setHotTopics] = useState([]);
  const [mentorProfile, setMentorProfile] = useState();
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [followingMentors, setFollowingMentors] = useState([]);
  const [currentSection, setCurrentSection] = useState(PROFILE_SECTION.PROFILE);
  const [feedbacks, setFeedbacks] = useState([]);
  const [seminars, setSeminars] = useState([]);

  const { setNotification } = useNotification();
  const { setLoading } = useCustomLoading();
  const { id } = useParams();
  const history = useHistory();

  const userInfo = useSelector(selectUserInfo);

  useEffect(() => {
    if (id) {
      setMentorId(id);
    } else if (!id && userInfo.role === SYSTEM_ROLE.MENTOR) {
      setMentorId(userInfo.accountId);
    } else {
      //Not allow user without mentor role to access CV page without id in the url
      history.push(ROUTES.NOT_FOUND);
    }
  }, []);

  useEffect(() => {
    if (!mentorId) return;

    getCVData();
    getTopics();
    getMentorProfile();
    getFeedbacks(mentorId);
    getSeminarByMentors(mentorId);
    if (userInfo.role === SYSTEM_ROLE.STUDENT) {
      getSchedule();
      getFollowingMentors();
    }
  }, [mentorId]);

  const getCVData = async () => {
    try {
      setLoading(true);
      let CVDataFromBE = {};
      CVDataFromBE = await cvEndpoints.getMentorCV(mentorId);
      if (CVDataFromBE.data === "" || CVDataFromBE.data || CVDataFromBE.data) {
        CVDataFromBE = INIT_CV;
      }
      delete CVDataFromBE.userProfileId;
      convertNullToEmptyArrayProperty(CVDataFromBE);
      const lastedPosition = findLastestWorkingExp(CVDataFromBE.workingExps);
      setPosition(lastedPosition);
      setCVData(CVDataFromBE);
    } catch (error) {
      setNotification({
        isOpen: true,
        type: "error",
        message: ERROR_MESSAGES.COMMON_ERROR,
      });
      history.push(ROUTES.HOME);
    } finally {
      setLoading(false);
    }
  };

  const getTopics = async () => {
    try {
      setLoading(true);
      const topics = await topicService.getTopicsByMentor(mentorId);
      setHotTopics(topics);
    } catch (error) {
      setNotification({
        isOpen: true,
        type: "error",
        message: ERROR_MESSAGES.COMMON_ERROR,
      });
      history.push(ROUTES.HOME);
    } finally {
      setLoading(false);
    }
  };

  const getMentorProfile = async () => {
    try {
      setLoading(true);
      const profile = await userAccountService.getUserProfileById(mentorId);

      if (profile.status !== USER_STATUS.ACTIVATED) {
        history.push(ROUTES.NOT_FOUND);
      }

      setMentorProfile(profile);
    } catch (error) {
      setNotification({
        isOpen: true,
        type: "error",
        message: ERROR_MESSAGES.COMMON_ERROR,
      });
      history.push(ROUTES.HOME);
    } finally {
      setLoading(false);
    }
  };

  const getFollowingMentors = async () => {
    try {
      setLoading(true);
      let result = await followMentorService.getFollowing(userInfo.accountId);
      result = result.map((mentor) => mentor.accountId);
      setFollowingMentors(result);
    } catch (error) {
      setNotification({
        isOpen: true,
        type: "error",
        message: ERROR_MESSAGES.COMMON_ERROR,
      });
    } finally {
      setLoading(false);
    }
  };

  const getSeminarByMentors = async (id) => {
    try {
      setLoading(true);
      let result = await seminarService.getSeminarByMentor(id);
      result = result.map((seminar) => {
        return {
          ...seminar,
          speakerList: seminar.mentors.map((mentor) => mentor.fullName),
          convertedStartDate: new Date(seminar.startTime),
        };
      });
      result.sort((a, b) => b.convertedStartDate - a.convertedStartDate);
      setSeminars(result);
    } catch (error) {
      setNotification({
        isOpen: true,
        type: "error",
        message: ERROR_MESSAGES.COMMON_ERROR,
      });
    } finally {
      setLoading(false);
    }
  };

  const getFeedbacks = async (accountId) => {
    try {
      setLoading(true);
      let result = await meetingFeedbackService.getFeedbackByUser(accountId);
      result = result.feedbacks.sort((a, b) => b.rating - a.rating);
      setFeedbacks(result);
    } catch (error) {
      setNotification({
        isOpen: true,
        type: "error",
        message: ERROR_MESSAGES.COMMON_ERROR,
      });
    } finally {
      setLoading(false);
    }
  };

  const processScheduleData = (data) => {
    let newData = data.map((el) => {
      return { ...el, convertedStartDate: new Date(el.startTime) };
    });
    newData.sort((a, b) => a.convertedStartDate - b.convertedStartDate);
    return newData;
  };

  const getSchedule = async () => {
    try {
      setLoading(true);
      const toDay = new Date();
      const nextMonth = moment(toDay).add(30, "days");
      const data = await scheduleService.getMentorSchedule(
        mentorId,
        format(toDay, DATE_FORMAT.BACK_END_YYYY_MM_DD),
        format(nextMonth.toDate(), DATE_FORMAT.BACK_END_YYYY_MM_DD)
      );
      const timeSlots = processScheduleData(data.timeSlots).slice(0, 4);
      setAvailableTimeSlots(timeSlots);
    } catch (error) {
      history.push(ROUTES.SERVER_ERROR);
    } finally {
      setLoading(false);
    }
  };

  const upsertHandler = async (data, prefix) => {
    let prevCV = cvData;

    if (prefix === CV_REGISTER_NAME_PREFIX.INTRODUCION) {
      prevCV.description = data.description;
    } else if (data.index !== undefined) {
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
    setLoading(true);

    const CVDataFromBE = await cvEndpoints.updateUserCV(prevCV);

    delete CVDataFromBE.userProfileId;

    convertNullToEmptyArrayProperty(CVDataFromBE);

    setCVData(CVDataFromBE);
    setIsLoading(false);
    setLoading(false);
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

  const onCloseModal = () => {
    setOpenModal(false);
    eventfile.target.value = null;
  };

  const onSelectImage = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setCroppingImage({ files: e.target.files });
      setOpenModal(true);
    }
  };

  const onChangeSection = (e, newValue) => {
    setCurrentSection(newValue);
  };

  const updateAvatar = async (url) => {
    try {
      setLoading(true);
      await userAccountService.updateUserProfile(userInfo.accountId, {
        ...userInfo,
        avatarLink: url,
        avatarUrl: url,
      });
    } catch (error) {
      setNotification({
        isOpen: true,
        type: "error",
        message: ERROR_MESSAGES.COMMON_ERROR,
      });
    } finally {
      setLoading(false);
      onCloseModal();
    }
  };

  const handleFollow = async (mentorId) => {
    try {
      setLoading(true);
      await followMentorService.follow(mentorId);
      await getFollowingMentors();
    } catch (error) {
      setNotification({
        isOpen: true,
        type: "error",
        message: ERROR_MESSAGES.COMMON_ERROR,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUnfollow = async (mentorId) => {
    try {
      setLoading(true);
      await followMentorService.unfollow(mentorId);
      await getFollowingMentors();
    } catch (error) {
      setNotification({
        isOpen: true,
        type: "error",
        message: ERROR_MESSAGES.COMMON_ERROR,
      });
    } finally {
      setLoading(false);
    }
  };

  const renderFollowButton = (mentorId) => {
    if (followingMentors.includes(mentorId)) {
      return (
        <div style={{ width: "30%", marginLeft: "auto", marginRight: "4rem" }}>
          <CustomizedButton
            variant="contained"
            color="primary600"
            onClick={() => handleUnfollow(mentorId)}
          >
            Hủy theo dõi
          </CustomizedButton>
        </div>
      );
    } else {
      return (
        <div style={{ width: "30%", marginLeft: "1rem" }}>
          <CustomizedButton
            variant="outlined"
            color="primary600"
            onClick={() => handleFollow(mentorId)}
          >
            Theo dõi
          </CustomizedButton>
        </div>
      );
    }
  };

  const renderCVSection = () => {
    return (
      <>
        {!detail && (
          <>
            {!id && cvData && <ProgressImage cvData={cvData} />}

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
                  editable={!id}
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
            viewData={mapCVSection(cvData[detail.key], detail.indexOfProperty)}
            title={detail.title}
            selectedTextFields={selectedTextFields}
            handleSubmit={upsertHandler}
            onDeleteProperty={onDeleteProperty}
          />
        )}
      </>
    );
  };

  const renderRatingSection = () => {
    if (feedbacks.length > 0) {
      return <RatingSection feedbacks={feedbacks} />;
    } else return <Typography>Chưa có đánh giá</Typography>;
  };

  const renderSeminarSection = () => {
    if (seminars.length > 0) {
      return <SeminarSection seminars={seminars} />;
    } else return <Typography>Chưa có dữ liệu</Typography>;
  };

  const renderSection = () => {
    if (currentSection === PROFILE_SECTION.PROFILE) {
      return renderCVSection();
    } else if (currentSection === PROFILE_SECTION.RATING) {
      return renderRatingSection();
    } else if (currentSection === PROFILE_SECTION.SEMINAR) {
      return renderSeminarSection();
    }
  };

  return (
    <div className={style.cv__container}>
      {!isLoading && (
        <div className={style.cv__detail}>
          <div className={style.cv__detail__information}>
            <div className={style.cv__detail__information_brief}>
              <div className={style.cv__detail__information_img}>
                <img
                  className={style.cv__detail__information_avatar}
                  src={
                    mentorProfile?.avatarUrl &&
                    mentorProfile.avatarUrl !== "String".toLocaleLowerCase()
                      ? mentorProfile.avatarUrl
                      : require("../../../assets/sbcf-default-avatar.png")
                  }
                />
                {!id && (
                  <div className={style.cv__detail__information_edit}>
                    <>
                      <input
                        style={{
                          display: "none",
                        }}
                        accept={VALID_IMAGE_FILE_TYPE.toString()}
                        id="choose-file"
                        type="file"
                        onChange={(e) => {
                          onSelectImage(e);
                          setEventFile(e);
                        }}
                      />
                      <label htmlFor="choose-file">
                        <img
                          // onClick={onOpenCropImage}
                          src={require("../../../assets/icons/pen-icon.png")}
                        />
                      </label>
                    </>
                  </div>
                )}
              </div>
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  display: "flex",
                }}
              >
                <div>
                  <h2>{mentorProfile?.fullName}</h2>
                  <p>
                    {position &&
                      `${position.position} ${OTHERS.AT} ${position.company}`}
                  </p>
                </div>
                {userInfo.role === SYSTEM_ROLE.STUDENT &&
                  renderFollowButton(id)}
              </div>
            </div>
          </div>

          <div className={style.cv__detail__profile}>
            <Box
              sx={{
                marginBottom: "1rem",
                width: "fit-content",
              }}
            >
              <Tabs
                value={currentSection}
                onChange={onChangeSection}
                TabIndicatorProps={{ style: { backgroundColor: "#283493" } }}
              >
                <CustomTab label="Hồ sơ" value={PROFILE_SECTION.PROFILE} />
                <CustomTab label="Đánh giá" value={PROFILE_SECTION.RATING} />
                <CustomTab
                  label="Sự kiện đã tham gia"
                  value={PROFILE_SECTION.SEMINAR}
                />
              </Tabs>
            </Box>
            {renderSection()}
          </div>
        </div>
      )}

      <div className={style.cv__booking}>
        <div className={style.cv__booking__section}>
          <h3>{CV_MENTOR.HOT_TOPIC}</h3>

          {hotTopics.map((topic, index) => (
            <>
              {index < 3 && (
                <div
                  key={`TOPIC_${index}`}
                  className={style.cv__booking__topic}
                >
                  <h4>{topic.name}</h4>
                  <p>
                    {ADD_TOPIC.CATEGORY}: {topic.category}
                  </p>
                  <p>
                    {ADD_TOPIC.FIELD}: {topic.field}
                  </p>
                </div>
              )}

              {index < 2 && <Divider />}
            </>
          ))}
        </div>

        {userInfo.role === SYSTEM_ROLE.STUDENT && (
          <div className={style.cv__booking__section}>
            <h3>{CV_MENTOR.AVAILABLE_TIME}</h3>
            <TimeSlots timeSlots={availableTimeSlots} />
            <CustomizedButton
              variant="contained"
              color="primary600"
              onClick={() => setOpenBookingInfoDialog(true)}
            >
              {BUTTON_LABEL.BOOKING_NOW}
            </CustomizedButton>
          </div>
        )}
      </div>

      <ConfirmImage
        openModal={openModal}
        onCloseModal={onCloseModal}
        croppingImage={croppingImage}
        onUpdateImage={updateAvatar}
      />

      {openBookingInfoDialog && (
        <BookingDialog
          open={openBookingInfoDialog}
          handleOpenDialog={setOpenBookingInfoDialog}
          mentorId={id}
        />
      )}
    </div>
  );
};

export default CV;
