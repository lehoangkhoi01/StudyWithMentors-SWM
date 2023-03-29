import React from "react";
import { Paper, Stepper, Step, StepLabel } from "@mui/material";
import style from "./ForgotPassword.module.scss";
import CustomTopTitle from "../../../shared/components/CustomTopTitle/CustomTopTitle";
import FirstStage from "./FirstStage/FirstStage";
import SecondStage from "./SecondStage/SecondStage";
import ThirdStage from "./ThirdStage/ThirdStage";

import { FORGOT_PASSWORD_STEPS, TITLE } from "../../../shared/constants/common";
import { useLocation, useParams } from "react-router-dom";

const steps = FORGOT_PASSWORD_STEPS;

const ForgotPassword = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const location = useLocation();
  const search = location.search;
  const { page } = useParams();

  console.log(new URLSearchParams(search).get("stage"));
  console.log(page);

  const moveNextStage = () => {
    setActiveStep((prev) => prev + 1);
  };

  const moveBackStage = () => {
    setActiveStep((prev) => prev - 1);
  };

  const renderFirstStage = () => {
    return <FirstStage moveNext={moveNextStage} />;
  };

  const renderSecondStage = () => {
    return <SecondStage moveNext={moveNextStage} moveBack={moveBackStage} />;
  };
  const renderThirdStage = () => {
    return <ThirdStage />;
  };

  return (
    <div className={`${style.container}`}>
      <div className={`${style.paper__container}`}>
        <Paper elevation={3} className={`${style.paper__content}`}>
          <CustomTopTitle title={TITLE.LOGIN_TROUBLE} />
          <Stepper
            activeStep={activeStep}
            sx={{ width: "70%", margin: "1em 0" }}
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
          {activeStep == 0 && renderFirstStage()}
          {activeStep == 1 && renderSecondStage()}
          {activeStep == 2 && renderThirdStage()}
        </Paper>
      </div>
    </div>
  );
};

export default ForgotPassword;
