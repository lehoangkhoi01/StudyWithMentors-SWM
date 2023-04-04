//import hooks ...
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

//import style and custom components
import style from "./SignUpForm.module.scss";
import { Typography } from "@mui/material";
import GoogleSignInButton from "../../../shared/components/GoogleSignInButton/GoogleSignInButton";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import CustomizedTextField from "../../../shared/components/TextField/CustomizedTextField";
import CustomTopTitle from "../../../shared/components/CustomTopTitle/CustomTopTitle";
import CustomDivider from "../CustomDivider/CustomDivider";
import CustomPattern from "../../../shared/components/CustomPattern/CustomPattern";
import ImageSideContainer from "../ImageSideContainer/ImageSideContainer";
import CustomizedButton from "../../../shared/components/Button/CustomizedButton";

//Others
import {
  COLOR,
  ERROR_MESSAGES,
  ROUTES,
  SIGN_UP_PLACEHOLDER,
  SIGN_UP_TEXT,
  TITLE,
} from "../../../shared/constants/common";
import {
  emailValidationRules,
  passwordValidation,
  registerFullNameValidation,
} from "../../../shared/constants/validationRules";
import { authenticationService } from "../../../Services/authenticationService";
import { SignInWithGoogle } from "../../../Helpers/googleAuthentication";
import { userAction } from "../../../Store/slices/userSlice";
import { useCustomLoading } from "../../../Helpers/generalHelper";

const SignUp = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const { setLoading } = useCustomLoading();

  const [signUpError, setSignUpError] = useState("");

  const onSubmit = async (data) => {
    setLoading(true);
    const body = {
      email: data.email,
      password: data.password,
      fullName: data.fullName,
    };
    try {
      const response = await authenticationService.signUp(body);
      history.push("/confirmation", response);
    } catch (error) {
      if (error.status === 409) {
        setSignUpError(ERROR_MESSAGES.DUPLICATED_EMAIL);
      } else {
        setSignUpError(ERROR_MESSAGES.SERVER_COMMON_ERROR);
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
      history.push("/home");
    } catch (error) {
      console.log(error);
      setSignUpError(ERROR_MESSAGES.SERVER_COMMON_ERROR);
    } finally {
      setLoading(false);
    }
  };

  const validationConfirmPassword = (val) => {
    if (!val || val.length === 0) {
      return ERROR_MESSAGES.REQUIRED_FIELD;
    }
    if (watch("password") != val) {
      return ERROR_MESSAGES.CONFIRM_PASSWORD_NOT_MATCH;
    }
  };

  return (
    <Grid2 container className={style.signUp__container}>
      <ImageSideContainer />
      <Grid2 xs={12} md={6} className={style.signUp__rightSide}>
        <CustomPattern width={"50%"} />
        <div className={style.signUp__formSection}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={`${style.signUp__form}`}
          >
            <CustomTopTitle title={TITLE.SIGN_UP} />
            <CustomizedTextField
              inputId="email"
              name={TITLE.EMAIL}
              required={true}
              placeholder={SIGN_UP_PLACEHOLDER.EMAIL}
              options={{ ...register("email", emailValidationRules) }}
              error={errors.email ? true : false}
              helperText={errors?.email?.message}
            />
            <CustomizedTextField
              inputId="fullname"
              name={TITLE.FULL_NAME}
              required={true}
              placeholder={SIGN_UP_PLACEHOLDER.FULL_NAME}
              options={{ ...register("fullName", registerFullNameValidation) }}
              error={errors.fullName ? true : false}
              helperText={errors?.fullName?.message}
            />
            <CustomizedTextField
              inputId="password"
              name={TITLE.PASSWORD}
              required={true}
              placeholder={SIGN_UP_PLACEHOLDER.PASSWORD}
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
            {signUpError && (
              <Typography variant="subtitle1" color={COLOR.SYSTEM_RED}>
                {signUpError}
              </Typography>
            )}

            <CustomizedButton
              type="submit"
              variant="contained"
              color="primary600"
            >
              {TITLE.SIGN_UP}
            </CustomizedButton>
          </form>
          <CustomDivider text={TITLE.OR} />
          <GoogleSignInButton onClick={handleSignInWithGoogle} />
          <div className={`${style.smallText__container}`}>
            <span>
              {SIGN_UP_TEXT.HAD_ACCOUNT}{" "}
              <a
                href={ROUTES.SIGN_IN}
                className={`${style.smallText__signUpLink}`}
              >
                {SIGN_UP_TEXT.SIGN_IN_NOW}
              </a>
            </span>
          </div>
        </div>
      </Grid2>
    </Grid2>
  );
};

export default SignUp;
