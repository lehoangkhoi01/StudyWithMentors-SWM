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
import { CustomBigCalendar } from "../../../shared/components/CustomBigCalendar/CustomBigCalendar";
import CustomizedButton from "../../../shared/components/Button/CustomizedButton";
import style from "./BookingStepper.module.scss";
import { styled } from "@mui/material/styles";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

const steps = ["Chọn chủ đề", "Chọn lịch cố vấn", "Mô tả", "Ghi chú"];
const topics = [
  {
    id: 1,
    title: "Phỏng vấn thực tập",
    field: "Kỹ năng mềm",
    category: "Phát triển bản thân",
  },
  {
    id: 2,
    title: "Quản lý thời gian",
    field: "Kỹ năng mềm",
    category: "Phát triển bản thân",
  },
  {
    id: 3,
    title: "Hướng nghiệp",
    field: "Kỹ năng mềm",
    category: "Phát triển bản thân",
  },
];

const CustomStepLabel = styled(StepLabel)`
  & > .Mui-active > svg,
  & > .Mui-completed > svg {
    color: #3948ab;
  }
`;

const BookingStepper = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [selectedTopic, setSelectedTopic] = React.useState(topics[0]);
  const [currentDate, setCurrentDate] = React.useState(new Date());

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleReset = () => {
    setActiveStep(0);
  };

  const handleSelectEvent = (e) => {
    console.log(e);
  };

  const handleNavigate = async (newDate, view) => {
    setCurrentDate(newDate);
    console.log(newDate);
    console.log(view);
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
        <TopicList topics={topics} setSelectedTopic={setSelectedTopic} />
      </>
    );
  };

  const renderSelectSlotUI = () => {
    return (
      <>
        <Typography className={`${style.booking__title}`}>
          Hãy chọn 1 khung giờ cố vấn từ lịch của mentor
        </Typography>
        <Typography className={`${style.booking__title}`}>
          Chủ đề: {selectedTopic.title}
        </Typography>
        <div className={`${style.booking__calendar}`}>
          <CustomBigCalendar
            date={currentDate}
            events={[]}
            onSelectEvent={handleSelectEvent}
            onNavigate={handleNavigate}
          />
        </div>
      </>
    );
  };

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
                    <CustomizedButton
                      variant="contained"
                      color="primary600"
                      size="small"
                      onClick={handleNext}
                    >
                      {activeStep === steps.length - 1
                        ? "Hoàn thành"
                        : "Tiếp tục"}
                    </CustomizedButton>
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
