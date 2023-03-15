import { Button, Divider, TextField } from "@mui/material";
import style from "./SignUpForm.module.scss";
import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  APP_NAME,
  SIGN_UP_PLACEHOLDER,
  SIGN_UP_STAGE,
  SIGN_UP_TEXT,
  TITLE,
} from "../../../shared/constants";
import GoogleSignInButton from "../../../shared/components/GoogleSignInButton/GoogleSignInButton";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import CustomizedTextField from "../../../shared/components/TextField/CustomizedTextField";

const SignUp = () => {
  const { register, handleSubmit } = useForm();
  const [stage, setStage] = useState(SIGN_UP_STAGE.SIGN_UP);
  const [signUpForm, setSignUpForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [tempEmail, setTempEmail] = useState("");

  const onSubmit = (data) => {
    console.log(data);
    setSignUpForm(data);
    setStage(SIGN_UP_STAGE.SENT_EMAIL);
  };

  const changeTempEmailHandler = (event) => {
    setTempEmail(event.target.value);
  };

  const updateEmail = () => {
    setSignUpForm((prevValue) => ({ ...prevValue, email: tempEmail }));
    console.log(signUpForm);
  };

  return (
    <Grid2 container className={style.signUp__container}>
      <Grid2 md={6} maxWidth={"50%"}>
        <img alt="background" src={require("../../../assets/image1.png")} />
      </Grid2>
      <Grid2 md={6}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`${style.signUp__form}`}
        >
          <h1>{APP_NAME}</h1>
          <h2>{TITLE.SIGN_UP}</h2>
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
                type="submit"
                className={`${style.signUp__button}`}
                variant="contained"
              >
                {TITLE.SIGN_UP}
              </Button>
              <div className={`${style.divider__container}`}>
                <Divider textAlign="center" sx={{ width: "100%" }} flexItem>
                  {TITLE.OR}
                </Divider>
              </div>
              <GoogleSignInButton />
              <p>
                {SIGN_UP_TEXT.HAD_PASSWORD}?{" "}
                <a href={"#"}>{SIGN_UP_TEXT.SIGN_IN_NOW}!</a>
              </p>
            </>
          )}
          {stage === SIGN_UP_STAGE.SENT_EMAIL && (
            <>
              <p>{SIGN_UP_TEXT.EMAIL_WAS_SENT}.</p>
              <p>
                {SIGN_UP_TEXT.PLEASE_CHECK_EMAIL} {signUpForm.email}
              </p>
              <div>
                <p>{SIGN_UP_TEXT.DID_NOT_RECEIVED_EMAIL}?</p>
                <GoogleSignInButton />
              </div>
              <p>{SIGN_UP_TEXT.CHANGE_EMAIL}</p>

              <TextField
                id="email"
                label="Email"
                value={tempEmail}
                onChange={changeTempEmailHandler}
              />

              <Button
                className={`${style.signUp__button}`}
                variant="contained"
                onClick={updateEmail}
              >
                {TITLE.UPDATE}
              </Button>
            </>
          )}
        </form>
      </Grid2>
    </Grid2>
  );
};

export default SignUp;
