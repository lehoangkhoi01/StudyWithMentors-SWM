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
import style from "./BookingStepper.module.scss";

const steps = ["Chọn chủ đề", "Chọn lịch cố vấn", "Mô tả", "Ghi chú"];
const topics = [
  { id: 1, title: "Phỏng vấn thực tập" },
  { id: 2, title: "Quản lý thời gian" },
  { id: 3, title: "Hướng nghiệp" },
];

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
        <Typography className={`${style.booking__title}`}>
          Hãy chọn 1 chủ đề mà bạn mong muốn được tư vấn
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
                <StepLabel {...labelProps}>{label}</StepLabel>
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

            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Trở về
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? "Hoàn thành" : "Tiếp tục"}
              </Button>
            </Box>
          </React.Fragment>
        )}
      </Box>
    </div>
  );
};

export default BookingStepper;
