import React from "react";
import { Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import style from "./FirstStage.module.scss";
import {
  BUTTON_LABEL,
  COMMON_MESSAGE,
  PLACE_HOLDER,
  TEXTFIELD_LABEL,
} from "../../../../shared/constants/common";
import { emailValidationRules } from "../../../../shared/constants/validationRules";
import CustomizedButton from "../../../../shared/components/Button/CustomizedButton";
import CustomizedTextField from "../../../../shared/components/TextField/CustomizedTextField";

const FirstStage = ({ moveNext }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmitFirstStage = (data) => {
    console.log(data);
    moveNext();
  };

  return (
    <>
      <Typography
        variant="h5"
        className={`${style.text} ${style.instructions}`}
        sx={{ marginBottom: "1em" }}
      >
        {COMMON_MESSAGE.ENTER_EMAIL_FOR_INSTRUCTIONS}
      </Typography>
      <img alt="pic2" src={require("../../../../assets/image2.png")} />
      <form
        onSubmit={handleSubmit(onSubmitFirstStage)}
        className={`${style.form}`}
      >
        <CustomizedTextField
          inputId="email"
          name={TEXTFIELD_LABEL.YOUR_EMAIL}
          required={true}
          placeholder={PLACE_HOLDER.ENTER_EMAIL}
          options={{
            ...register("email", emailValidationRules),
          }}
          error={errors.email ? true : false}
          helperText={errors?.email?.message}
        />
        <CustomizedButton type="submit" variant="contained" color="primary600">
          {BUTTON_LABEL.RESET_PASSWORD}
        </CustomizedButton>
      </form>
    </>
  );
};

export default FirstStage;
