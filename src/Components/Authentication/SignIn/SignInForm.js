import React, { useEffect } from "react";
import style from "./SignInForm.module.scss";
import { Button, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useForm } from "react-hook-form";
import {
  BUTTON_LABEL,
  COLOR,
  ERROR_MESSAGES,
  PLACE_HOLDER,
  ROUTES,
  SIGN_UP_TEXT,
  TITLE,
} from "../../../shared/constants/common";
import GoogleSignInButton from "../../../shared/components/GoogleSignInButton/GoogleSignInButton";
import CustomizedTextField from "../../../shared/components/TextField/CustomizedTextField";
import CustomTopTitle from "../CustomTopTitle/CustomTopTitle";
import CustomDivider from "../CustomDivider/CustomDivider";
import CustomPattern from "../../../shared/components/CustomPattern/CustomPattern";
import ImageSideContainer from "../ImageSideContainer/ImageSideContainer";
import { SignInWithGoogle } from "../../../Helpers/googleAuthentication";
import { emailValidationRules } from "../../../shared/constants/validationRules";

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("submit!");
    console.log(data);
  };

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  const handleSignInWithGoogle = () => {
    SignInWithGoogle();
  };

  return (
    <Grid2 container className={`${style.signIn__container}`}>
      <Grid2 xs={12} md={6} className={`${style.signIn__formContainer}`}>
        <CustomPattern width={"50%"} height={"95%"} />
        <div className={`${style.signIn__formSection}`}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={`${style.signIn__form}`}
          >
            <CustomTopTitle title={TITLE.SIGN_IN} />
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
            <div className={`${style.forgotPassword__container}`}>
              <a href="#" className={`${style.forgotPassword__link}`}>
                {TITLE.FORGOT_PASSWORD}
              </a>
            </div>
            <Typography variant="subtitle1" color={COLOR.SYSTEM_RED}>
              {ERROR_MESSAGES.WRONG_EMAIL_OR_PASSWORD}
            </Typography>

            <Button
              fullWidth
              type="submit"
              className={`${style.signIn__button} ${style.button}`}
              variant="contained"
            >
              {BUTTON_LABEL.LOGIN}
            </Button>
          </form>

          <CustomDivider text={TITLE.OR} />
          <GoogleSignInButton onClick={handleSignInWithGoogle} />

          <div className={`${style.registerSuggestion__container}`}>
            <span>
              {SIGN_UP_TEXT.HAD_NO_ACCOUNT}{" "}
              <a
                href={ROUTES.SIGN_UP}
                className={`${style.registerSuggestion__signUpLink}`}
              >
                {SIGN_UP_TEXT.SIGN_UP_SUGGEST}
              </a>
            </span>
          </div>
        </div>
      </Grid2>
      <ImageSideContainer />
    </Grid2>
  );
};

export default SignInForm;
