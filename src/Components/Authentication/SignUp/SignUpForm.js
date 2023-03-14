import { Button, TextField } from "@mui/material";
import style from "./SignUpForm.module.scss";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { SIGN_UP_STAGE, SIGN_UP_TEXT, TITLE } from "../../../shared/constants";
import GoogleSignInButton from "../../../shared/components/GoogleSignInButton/GoogleSignInButton";

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
  };
  console.log(signUpForm);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`${style.signUp__container}`}
    >
      <h1>{TITLE.GROWTH_ME}</h1>
      <h2>{TITLE.SIGN_UP}</h2>
      {stage === SIGN_UP_STAGE.SIGN_UP && (
        <>
          <TextField id="email" label="Email" {...register("email")} />
          <TextField
            id="fullname"
            label={TITLE.FULL_NAME}
            {...register("fullName")}
          />
          <TextField
            id="password"
            label={TITLE.PASSWORD}
            {...register("password")}
          />
          <TextField
            id="confirmPassword"
            label={TITLE.CONFIRM_PASSWORD}
            {...register("confirmPassword")}
          />
          <Button
            type="submit"
            className={`${style.signUp__button}`}
            variant="contained"
          >
            {TITLE.SIGN_UP}
          </Button>

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
  );
};

export default SignUp;
