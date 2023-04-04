import React from "react";
import { useForm } from "react-hook-form";
import style from "./ResetPassword.module.scss";
import { Paper, Stepper, Step, StepLabel, Typography } from "@mui/material";
import {
  FORGOT_PASSWORD_STEPS,
  TITLE,
  COMMON_MESSAGE,
  PLACE_HOLDER,
  BUTTON_LABEL,
  ERROR_MESSAGES,
  SIGN_UP_PLACEHOLDER,
} from "../../../shared/constants/common";
import CustomizedTextField from "../../../shared/components/TextField/CustomizedTextField";
import CustomizedButton from "../../../shared/components/Button/CustomizedButton";
import CustomTopTitle from "../../../shared/components/CustomTopTitle/CustomTopTitle";

import { passwordValidation } from "../../../shared/constants/validationRules";
import { authenticationService } from "../../../Services/authenticationService";
import { useCustomLoading } from "../.././../Helpers/generalHelper";

const steps = FORGOT_PASSWORD_STEPS;
const ResetPassword = (props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { setLoading } = useCustomLoading();

  const validationConfirmPassword = (val) => {
    if (!val || val.length == 0) {
      return ERROR_MESSAGES.REQUIRED_FIELD;
    }
    if (watch("password") != val) {
      return ERROR_MESSAGES.CONFIRM_PASSWORD_NOT_MATCH;
    }
  };

  const handleSubmitPasswordChange = async (data) => {
    setLoading(true);
    const requestBody = {
      oobCode: props.oobCode,
      password: data.password,
    };
    console.log(requestBody);
    try {
      const response = await authenticationService.applyPasswordChange(
        requestBody
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${style.container}`}>
      <div className={`${style.paper__container}`}>
        <Paper elevation={3} className={`${style.paper__content}`}>
          <CustomTopTitle title={TITLE.LOGIN_TROUBLE} />
          <Stepper activeStep={2} sx={{ width: "70%", margin: "1em 0" }}>
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
          <Typography
            variant="h5"
            className={`${style.text} ${style.instruction}`}
          >
            {COMMON_MESSAGE.CONFIRM_EMAIL_SUCCESS}
          </Typography>
          <form
            className={`${style.form}`}
            onSubmit={handleSubmit(handleSubmitPasswordChange)}
          >
            <CustomizedTextField
              inputId="password"
              name={TITLE.PASSWORD}
              required={true}
              placeholder={PLACE_HOLDER.LOGIN_PASSWORD}
              type={"password"}
              options={{ ...register("password", passwordValidation) }}
              error={errors.password ? true : false}
              helperText={errors?.password?.message}
            />
            <CustomizedTextField
              inputId="confirmPassword"
              name={TITLE.CONFIRM_PASSWORD}
              required={true}
              placeholder={SIGN_UP_PLACEHOLDER.CONFIRM_PASSWORD}
              type={"password"}
              options={{
                ...register("confirmPassword", {
                  validate: (val) => validationConfirmPassword(val),
                }),
              }}
              error={errors.confirmPassword ? true : false}
              helperText={errors?.confirmPassword?.message}
            />
            <CustomizedButton
              type="submit"
              variant="contained"
              color="primary600"
            >
              {BUTTON_LABEL.LOGIN}
            </CustomizedButton>
          </form>
        </Paper>
      </div>
    </div>
  );
};

export default ResetPassword;
