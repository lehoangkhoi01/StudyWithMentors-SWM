import { Button } from "@mui/material";
import style from "./SignUpForm.module.scss";
import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  SIGN_UP_PLACEHOLDER,
  SIGN_UP_STAGE,
  SIGN_UP_TEXT,
  TITLE,
} from "../../../shared/constants";
import GoogleSignInButton from "../../../shared/components/GoogleSignInButton/GoogleSignInButton";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import CustomizedTextField from "../../../shared/components/TextField/CustomizedTextField";
import CustomTopTitle from "../CustomTopTitle/CustomTopTitle";
import CustomDivider from "../CustomDivider/CustomDivider";
import CustomPattern from "../CustomPattern/CustomPattern";

const SignUp = () => {
  const { register, handleSubmit } = useForm();
  const [stage, setStage] = useState(SIGN_UP_STAGE.SIGN_UP);
  // const [signUpForm, setSignUpForm] = useState({
  //   fullName: "",
  //   email: "",
  //   password: "",
  //   confirmPassword: "",
  // });

  const onSubmit = (data) => {
    console.log(data);
    //setSignUpForm(data);
    setStage(SIGN_UP_STAGE.SENT_EMAIL);
  };

  return (
    <Grid2 container className={style.signUp__container}>
      <Grid2 md={6} maxWidth={"50%"}>
        <img alt="background" src={require("../../../assets/image1.png")} />
      </Grid2>
      <Grid2 md={6} className={style.signUp__rightSide}>
        <CustomPattern />
        <div className={style.signUp__formSection}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={`${style.signUp__form}`}
          >
            <CustomTopTitle title={TITLE.SIGN_UP} />
            {stage === SIGN_UP_STAGE.SIGN_UP && (
              <>
                <CustomizedTextField
                  inputId="email"
                  name={TITLE.EMAIL}
                  placeholder={SIGN_UP_PLACEHOLDER.EMAIL}
                  required={true}
                  type={"email"}
                  options={{ ...register("email") }}
                />
                <CustomizedTextField
                  inputId="fullname"
                  name={TITLE.FULL_NAME}
                  placeholder={SIGN_UP_PLACEHOLDER.FULL_NAME}
                  required={true}
                  options={{ ...register("fullName") }}
                />
                <CustomizedTextField
                  inputId="password"
                  name={TITLE.PASSWORD}
                  placeholder={SIGN_UP_PLACEHOLDER.PASSWORD}
                  required={true}
                  type={"password"}
                  options={{ ...register("password") }}
                />
                <CustomizedTextField
                  inputId="confirmPassword"
                  name={TITLE.CONFIRM_PASSWORD}
                  placeholder={SIGN_UP_PLACEHOLDER.CONFIRM_PASSWORD}
                  required={true}
                  type={"password"}
                  options={{ ...register("confirmPassword") }}
                />
                <Button
                  fullWidth
                  type="submit"
                  className={`${style.signUp__button}`}
                  variant="contained"
                >
                  {TITLE.SIGN_UP}
                </Button>
              </>
            )}
          </form>
          <CustomDivider text={TITLE.OR} />
          <GoogleSignInButton />
          <div className={`${style.smallText__container}`}>
            <span>
              {SIGN_UP_TEXT.HAD_ACCOUNT}{" "}
              <a href="/sign-in" className={`${style.smallText__signUpLink}`}>
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
