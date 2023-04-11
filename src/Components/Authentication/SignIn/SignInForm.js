import React, { useState } from "react";
import { useDispatch } from "react-redux";
import style from "./SignInForm.module.scss";
import { Typography } from "@mui/material";
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
import CustomTopTitle from "../../../shared/components/CustomTopTitle/CustomTopTitle";
import CustomDivider from "../CustomDivider/CustomDivider";
import CustomPattern from "../../../shared/components/CustomPattern/CustomPattern";
import ImageSideContainer from "../ImageSideContainer/ImageSideContainer";
import { SignInWithGoogle } from "../../../Helpers/googleAuthentication";
import { emailValidationRules } from "../../../shared/constants/validationRules";
import CustomizedButton from "../../../shared/components/Button/CustomizedButton";
import { authenticationService } from "../../../Services/authenticationService";
import { useHistory } from "react-router-dom";
import { userAction } from "../../../Store/slices/userSlice";
import { useCustomLoading } from "../../../Helpers/generalHelper";

const SignInForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { setLoading } = useCustomLoading();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [signInError, setSignInError] = useState("");

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      var result = await authenticationService.signInWithPassword(data);
      localStorage.setItem("TOKEN", result.accessToken);
      dispatch(userAction.loginSuccess(result));
      history.push(ROUTES.HOME);
    } catch (error) {
      console.log(error);
      if (error.status === 409) {
        setSignInError(ERROR_MESSAGES.WRONG_EMAIL_OR_PASSWORD);
      } else {
        history.push(ROUTES.SERVER_ERROR);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignInWithGoogle = async () => {
    setLoading(true);
    try {
      const googleSignInResult = await SignInWithGoogle();
      const response = await authenticationService.signInGoogle(
        googleSignInResult
      );
      localStorage.setItem("TOKEN", response.accessToken);
      dispatch(userAction.loginSuccess(response));
      history.push(ROUTES.HOME);
    } catch (error) {
      history.push(ROUTES.SERVER_ERROR);
    } finally {
      setLoading(false);
    }
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
              <a
                href={ROUTES.FORGOT_PASSWORD}
                className={`${style.forgotPassword__link}`}
              >
                {TITLE.FORGOT_PASSWORD}
              </a>
            </div>
            {signInError && (
              <Typography variant="subtitle1" color={COLOR.SYSTEM_RED}>
                {signInError}
              </Typography>
            )}
            <CustomizedButton
              type="submit"
              variant="contained"
              color="primary600"
            >
              {BUTTON_LABEL.LOGIN}
            </CustomizedButton>
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
