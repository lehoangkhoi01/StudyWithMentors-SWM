import React from "react";
import { Paper, Stepper, Step, StepLabel } from "@mui/material";
import style from "./ForgotPassword.module.scss";
import CustomTopTitle from "../../../shared/components/CustomTopTitle/CustomTopTitle";
import FirstStage from "./FirstStage/FirstStage";
import SecondStage from "./SecondStage/SecondStage";

import { FORGOT_PASSWORD_STEPS, TITLE } from "../../../shared/constants/common";

const steps = FORGOT_PASSWORD_STEPS;

const ForgotPassword = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [resetEmail, setResetEmail] = React.useState("");

  const moveToSecondStage = (data) => {
    setResetEmail(data.email);
    setActiveStep((prev) => prev + 1);
  };

  const moveBackStage = () => {
    setActiveStep((prev) => prev - 1);
  };

  const renderFirstStage = () => {
    return <FirstStage moveNext={moveToSecondStage} />;
  };

  const renderSecondStage = (email) => {
    return <SecondStage email={email} moveBack={moveBackStage} />;
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
          {activeStep == 1 && renderSecondStage(resetEmail)}
        </Paper>
      </div>
    </div>
  );
};

export default ForgotPassword;
