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
import { emailValidationRules } from "../../../../shared/constants/validationRules";
import style from "./ThirdStage.module.scss";

const ThirdStage = () => {
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

  const onSubmitFirstStage = (data) => {
    console.log("submit!");
    console.log(data);
  };

  return (
    <>
      <Typography variant="h5" className={`${style.text} ${style.instruction}`}>
        {COMMON_MESSAGE.CONFIRM_EMAIL_SUCCESS}
      </Typography>
      <form
        className={`${style.form}`}
        onSubmit={handleSubmit(onSubmitFirstStage)}
      >
        <CustomizedTextField
          inputId="email"
          name="Email"
          required={true}
          placeholder={PLACE_HOLDER.LOGIN_EMAIL}
          options={{
            ...register("email", emailValidationRules),
          }}
          error={errors.email ? true : false}
          helperText={errors?.email?.message}
        />
        <CustomizedTextField
          inputId="password"
          name="Password"
          required={true}
          placeholder={PLACE_HOLDER.LOGIN_PASSWORD}
          type={"password"}
          options={{ ...register("password") }}
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
