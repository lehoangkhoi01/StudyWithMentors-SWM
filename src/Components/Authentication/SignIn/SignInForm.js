import React from "react";
import style from "./SignInForm.module.scss";
import { Button } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useForm } from "react-hook-form";
import {
  BUTTON_LABEL,
  PLACE_HOLDER,
  ROUTES,
  SIGN_UP_TEXT,
  TITLE,
} from "../../../shared/constants";
import GoogleSignInButton from "../../../shared/components/GoogleSignInButton/GoogleSignInButton";
import CustomizedTextField from "../../../shared/components/TextField/CustomizedTextField";
import CustomTopTitle from "../CustomTopTitle/CustomTopTitle";
import CustomDivider from "../CustomDivider/CustomDivider";
import CustomPattern from "../../../shared/components/CustomPattern/CustomPattern";
import ImageSideContainer from "../ImageSideContainer/ImageSideContainer";

const SignInForm = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
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
              placeholder={PLACE_HOLDER.LOGIN_EMAIL}
              required={true}
              options={{ ...register("password") }}
            />
            <CustomizedTextField
              inputId="password"
              name="Password"
              required={true}
              placeholder={PLACE_HOLDER.LOGIN_PASSWORD}
              options={{ ...register("email") }}
            />
          </form>

          <div className={`${style.forgotPassword__container}`}>
            <a href="#" className={`${style.forgotPassword__link}`}>
              {TITLE.FORGOT_PASSWORD}
            </a>
          </div>

          <Button
            fullWidth
            type="submit"
            className={`${style.signIn__button} ${style.button}`}
            variant="contained"
          >
            {BUTTON_LABEL.LOGIN}
          </Button>

          <CustomDivider text={TITLE.OR} />
          <GoogleSignInButton />

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
