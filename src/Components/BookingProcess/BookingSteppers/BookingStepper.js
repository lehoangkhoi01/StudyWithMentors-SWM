import React from "react";
import {
  Box,
  Stepper,
  Typography,
  Step,
  StepLabel,
  Button,
} from "@mui/material";
import TopicList from "../TopicList/TopicList";
import CustomizedButton from "../../../shared/components/Button/CustomizedButton";
import style from "./BookingStepper.module.scss";
import { styled } from "@mui/material/styles";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import StudentNoteStep from "../StudentNoteStep/StudentNoteStep";
import SelectSlotUIStep from "../SelectSlotUIStep/SelectSlotUIStep";
import SummaryStep from "../SummaryStep/SummaryStep";
import {
  DATE_FORMAT,
  ERROR_MESSAGES,
  LENGTH,
} from "../../../shared/constants/common";
import { format } from "date-fns";
import { bookingService } from "../../../Services/bookingService";
import {
  useCustomLoading,
  useNotification,
} from "../../../Helpers/generalHelper";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { selectUserInfo } from "../../../Store/slices/userSlice";
import { ROUTES } from "../../../shared/constants/navigation";
import { useForm } from "react-hook-form";

const steps = ["Chọn chủ đề", "Chọn lịch cố vấn", "Mô tả", "Ghi chú"];

const CustomStepLabel = styled(StepLabel)`
  & > .Mui-active > svg,
  & > .Mui-completed > svg {
    color: #3948ab;
  }
`;

const BookingStepper = (props) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [selectedTopic, setSelectedTopic] = React.useState(null);
  const [studentNote, setStudentNote] = React.useState(null);
  const [selectSlot, setSelectSlot] = React.useState(null);
  const [selectedStudents, setSelectedStudents] = React.useState([]);

  const { setLoading } = useCustomLoading();
  const { setNotification } = useNotification();
  const userInfo = useSelector(selectUserInfo);
  const history = useHistory();

  const {
    setError,
    formState: { errors },
  } = useForm();

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleNext = () => {
    if (activeStep === 2) {
      //Validation for student note and participants
      let isValid = true;
      if (selectedStudents.length > LENGTH.PARTICIPANTS_MAX) {
        isValid = false;
        setError("participants", {
          type: "custom",
          message: ERROR_MESSAGES.MAX_PARTICIPANTS,
        });
      }
      if (studentNote?.length > LENGTH.STUDENT_NOTE_MAX) {
        isValid = false;
        setError("studentNote", {
          type: "custom",
          message: ERROR_MESSAGES.STUDENT_NOTE_MAX,
        });
      }

      if (isValid) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleSelectSlot = (slot) => {
    setSelectSlot(slot);
    handleNext();
  };

  const renderSelectTopicUI = () => {
    return (
      <>
        <Typography
          fontWeight={600}
          fontSize="1.2rem"
          className={`${style.booking__title}`}
        >
          Hãy chọn 1 chủ đề mà bạn mong muốn được tư vấn:
        </Typography>
        <TopicList topics={props.topics} setSelectedTopic={setSelectedTopic} />
      </>
    );
  };

  const onStudentNoteChange = (e) => {
    setStudentNote(e.target.value);
  };

  const renderStudentNoteStep = () => {
    return (
      <StudentNoteStep
        onTextFieldChange={onStudentNoteChange}
        selectedStudents={selectedStudents}
        setSelectedStudents={setSelectedStudents}
        value={studentNote}
        errors={errors}
      />
    );
  };

  const renderSelectSlotUI = () => {
    return (
      <SelectSlotUIStep
        selectedTopic={selectedTopic}
        mentorId={props.mentorId}
        handleSelectSlot={handleSelectSlot}
      />
    );
  };

  const renderSummaryStep = () => {
    return (
      <SummaryStep
        studentNote={studentNote}
        selectedSlot={selectSlot}
        selectedTopic={selectedTopic}
        selectedStudents={selectedStudents}
        mentorInfo={props.mentorInfo}
      />
    );
  };

  const handleSubmitBooking = async () => {
    setLoading(true);
    let participants = [userInfo.accountId];
    if (selectedStudents.length > 0) {
      const participantIds = selectedStudents.map(
        (speaker) => speaker.accountId
      );
      participants = participants.concat(participantIds);
    }
    try {
      const data = {
        mentorId: props.mentorId,
        startTime: format(selectSlot.start, DATE_FORMAT.BACK_END_HH_mm_ss),
        endTime: format(selectSlot.end, DATE_FORMAT.BACK_END_HH_mm_ss),
        startDate: format(selectSlot.start, DATE_FORMAT.BACK_END_YYYY_MM_DD),
        scheduleId: selectSlot.scheduleId,
        topicId: selectedTopic.id,
        description: studentNote,
        participants: participants,
      };
      await bookingService.createBooking(data);
      setNotification({
        isOpen: true,
        type: "success",
        message: "Đặt lịch thành công",
      });
      props.handleCloseDialog();
      history.push(ROUTES.BOOKING_LIST);
    } catch (error) {
      if (error.status === 400) {
        setNotification({
          isOpen: true,
          type: "error",
          message: "Bạn đã đặt lịch vào khung giờ này. Không thể tiếp tục đặt",
        });
      } else {
        setNotification({
          isOpen: true,
          type: "error",
          message: "Đặt lịch thất bại. Xin vui lòng thử lại sau.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (props.topics?.length > 0 && !selectedTopic) {
      setSelectedTopic(props.topics[0]);
    }
  }, [props.topics]);

  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <Stepper
          activeStep={activeStep}
          className={`${style.booking__stepper}`}
        >
          {steps.map((label) => {
            const stepProps = {};
            const labelProps = {};
            return (
              <Step key={label} {...stepProps}>
                <CustomStepLabel {...labelProps}>{label}</CustomStepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {activeStep === 0 && renderSelectTopicUI()}
            {activeStep === 1 && renderSelectSlotUI()}
            {activeStep === 2 && renderStudentNoteStep()}
            {activeStep === 3 && renderSummaryStep()}

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                pt: 2,
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  width: "80%",
                }}
              >
                <Grid2 container spacing={2} width="100%">
                  {activeStep !== 0 && (
                    <Grid2 xs={12} md={6}>
                      <CustomizedButton
                        onClick={handleBack}
                        color="primary600"
                        variant="outlined"
                        size="small"
                      >
                        Trở về
                      </CustomizedButton>
                    </Grid2>
                  )}

                  <Grid2 xs={12} md={activeStep === 0 ? 12 : 6}>
                    {activeStep === steps.length - 1 ? (
                      <CustomizedButton
                        variant="contained"
                        color="primary600"
                        size="small"
                        onClick={handleSubmitBooking}
                      >
                        Đặt lịch
                      </CustomizedButton>
                    ) : (
                      <CustomizedButton
                        variant="contained"
                        color="primary600"
                        size="small"
                        disabled={activeStep === 1 || props.topics.length === 0}
                        onClick={handleNext}
                      >
                        Tiếp tục
                      </CustomizedButton>
                    )}
                  </Grid2>
                </Grid2>
              </Box>
            </Box>
          </React.Fragment>
        )}
      </Box>
    </div>
  );
};

export default BookingStepper;
