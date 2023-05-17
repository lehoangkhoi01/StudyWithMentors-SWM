import React from "react";
import { useDispatch } from "react-redux";
import style from "./SignInForm.module.scss";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { ERROR_MESSAGES, ROUTES } from "../../../shared/constants/common";
import GoogleSignInButton from "../../../shared/components/GoogleSignInButton/GoogleSignInButton";
import CustomPattern from "../../../shared/components/CustomPattern/CustomPattern";
import ImageSideContainer from "../ImageSideContainer/ImageSideContainer";
import { SignInWithGoogle } from "../../../Helpers/googleAuthentication";
import { authenticationService } from "../../../Services/authenticationService";
import { useHistory } from "react-router-dom";
import { userAction } from "../../../Store/slices/userSlice";
import { useCustomLoading } from "../../../Helpers/generalHelper";
import { Typography } from "@mui/material";

const SignInForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { setLoading } = useCustomLoading();
  const [loginError, setLoginError] = React.useState("");

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
      if (error.status == "403") {
        setLoginError(ERROR_MESSAGES.UNAUTHORIZED_SIGNIN);
      } else {
        history.push(ROUTES.SERVER_ERROR);
      }
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid2 container className={`${style.signIn__container}`}>
      <Grid2 xs={12} md={6} className={`${style.signIn__formContainer}`}>
        <CustomPattern width={"50%"} height={"95%"} />
        <div className={`${style.signIn__formSection}`}>
          <GoogleSignInButton onClick={handleSignInWithGoogle} />
          <Typography
            variant="subtitle1"
            className={`${style.signIn__errorText}`}
          >
            {loginError}
          </Typography>
        </div>
      </Grid2>
      <ImageSideContainer />
    </Grid2>
  );
};

export default SignInForm;
