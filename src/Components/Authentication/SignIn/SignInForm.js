import React from "react";
import style from "./SignInForm.module.scss";
import { Button } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useForm } from "react-hook-form";
import {
  BUTTON_LABEL,
  PLACE_HOLDER,
  SIGN_UP_TEXT,
  TITLE,
} from "../../../shared/constants";
import GoogleSignInButton from "../../../shared/components/GoogleSignInButton/GoogleSignInButton";
import CustomizedTextField from "../../../shared/components/TextField/CustomizedTextField";
import CustomTopTitle from "../CustomTopTitle/CustomTopTitle";
import CustomDivider from "../CustomDivider/CustomDivider";
import CustomPattern from "../CustomPattern/CustomPattern";

const SignInForm = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Grid2 container className={`${style.signIn__container}`}>
      <Grid2 md={6} className={`${style.signIn__formContainer}`}>
        {/* <img
          className={`${style.signIn__leftPattern}`}
          alt="left-pattern"
          src={require("../../../assets/auth-pattern-left.png")}
        />
        <img
          className={`${style.signIn__rightPattern}`}
          alt="right-pattern"
          src={require("../../../assets/auth-pattern-right.png")}
        /> */}
        <CustomPattern />
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
              options={{ ...register("password") }}
            />
            <CustomizedTextField
              inputId="password"
              name="Password"
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
            className={`${style.signIn__button}`}
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
                href="/sign-up"
                className={`${style.registerSuggestion__signUpLink}`}
              >
                {SIGN_UP_TEXT.SIGN_UP_SUGGEST}
              </a>
            </span>
          </div>
        </div>
      </Grid2>

      <Grid2 md={6} maxWidth={"50%"}>
        <img alt="background" src={require("../../../assets/image1.png")} />
      </Grid2>
    </Grid2>
  );
};

export default SignInForm;
