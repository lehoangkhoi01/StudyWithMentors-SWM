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
  ROUTES,
} from "../../../shared/constants/common";
import CustomizedTextField from "../../../shared/components/TextField/CustomizedTextField";
import CustomizedButton from "../../../shared/components/Button/CustomizedButton";
import CustomTopTitle from "../../../shared/components/CustomTopTitle/CustomTopTitle";

import { passwordValidation } from "../../../shared/constants/validationRules";
import { authenticationService } from "../../../Services/authenticationService";
import { useCustomLoading } from "../.././../Helpers/generalHelper";
import { Link, useHistory } from "react-router-dom";

const steps = FORGOT_PASSWORD_STEPS;
const ResetPassword = (props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const history = useHistory();
  const { setLoading } = useCustomLoading();
  const [isResetSuccess, setResetSuccess] = React.useState(true);

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
    try {
      const response = await authenticationService.applyPasswordChange(
        requestBody
      );
      console.log(response);
      setResetSuccess(true);
    } catch (error) {
      console.log(error);
      history.push(ROUTES.SERVER_ERROR);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${style.container}`}>
      <div className={`${style.paper__container}`}>
        <Paper elevation={3} className={`${style.paper__content}`}>
          <CustomTopTitle title={TITLE.LOGIN_TROUBLE} />
          <Stepper
            activeStep={2}
            sx={{ width: "70%", margin: "1em 0" }}
            className={`${style.stepper}`}
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
          {isResetSuccess ? (
            <>
              <Typography
                variant="h5"
                className={`${style.text} ${style.instruction}`}
              >
                {COMMON_MESSAGE.APPLY_RESET_PASSWORD_SUCCESS}
              </Typography>
              <Link to={ROUTES.SIGN_IN} className={`${style.navigation}`}>
                <CustomizedButton variant="contained" color="primary600">
                  {BUTTON_LABEL.BACK_TO_LOG_IN}
                </CustomizedButton>
              </Link>
            </>
          ) : (
            <>
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
            </>
          )}
        </Paper>
      </div>
    </div>
  );
};

export default ResetPassword;
