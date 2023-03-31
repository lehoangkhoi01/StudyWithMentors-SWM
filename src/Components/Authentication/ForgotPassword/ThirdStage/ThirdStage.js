import { Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import CustomizedTextField from "../../../../shared/components/TextField/CustomizedTextField";
import CustomizedButton from "../../../../shared/components/Button/CustomizedButton";
import {
  COMMON_MESSAGE,
  PLACE_HOLDER,
  ERROR_MESSAGES,
  SIGN_UP_PLACEHOLDER,
  TITLE,
  BUTTON_LABEL,
} from "../../../../shared/constants/common";
import { passwordValidation } from "../../../../shared/constants/validationRules";
import style from "./ThirdStage.module.scss";
import { authenticationService } from "../../../../Services/authenticationService";

const ThirdStage = (props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const validationConfirmPassword = (val) => {
    if (!val || val.length == 0) {
      return ERROR_MESSAGES.REQUIRED_FIELD;
    }
    if (watch("password") != val) {
      return ERROR_MESSAGES.CONFIRM_PASSWORD_NOT_MATCH;
    }
  };

  const handleSubmitPasswordChange = async (data) => {
    if (props.oobCode) {
      const requestBody = {
        oobCode: props?.oobCode,
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
      }
    }
  };

  return (
    <>
      <Typography variant="h5" className={`${style.text} ${style.instruction}`}>
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
        <CustomizedButton type="submit" variant="contained" color="primary600">
          {BUTTON_LABEL.LOGIN}
        </CustomizedButton>
      </form>
    </>
  );
};

export default ThirdStage;
