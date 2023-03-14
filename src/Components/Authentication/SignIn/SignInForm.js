import React from "react";
import style from "./SignInForm.module.scss";
import { TextField, Button, Divider } from "@mui/material";
import { useForm } from "react-hook-form";
import { BUTTON_LABEL, TITLE } from "../../../shared/constants";
import GoogleSignInButton from "../../../shared/components/GoogleSignInButton/GoogleSignInButton";

const SignInForm = () => {
  const { register } = useForm();

  return (
    <div className={`${style.signIn__container}`}>
      <h1>Growth Me</h1>
      <h2>{TITLE.SIGN_IN}</h2>
      <TextField
        fullWidth
        required
        id="outlined-required"
        label={TITLE.EMAIL}
        type="email"
        sx={{ width: "50%" }}
        {...register("email")}
      />
      <TextField
        fullWidth
        required
        id="password"
        label={TITLE.PASSWORD}
        type="password"
        sx={{ width: "50%" }}
        {...register("password")}
      />
      <div className={`${style.forgotPassword__container}`}>
        <a href="#">{TITLE.FORGOT_PASSWORD}</a>
      </div>
      <Button
        type="submit"
        className={`${style.signIn__button}`}
        variant="contained"
      >
        {BUTTON_LABEL.LOGIN}
      </Button>
      <div className={`${style.divider__container}`}>
        <Divider textAlign="center" sx={{ width: "100%" }} flexItem>
          {TITLE.OR}
        </Divider>
      </div>
      <GoogleSignInButton />
    </div>
  );
};

export default SignInForm;
