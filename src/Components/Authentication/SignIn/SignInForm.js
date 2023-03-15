import React from "react";
import style from "./SignInForm.module.scss";
import { Button, Divider } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useForm } from "react-hook-form";
import { BUTTON_LABEL, PLACE_HOLDER, TITLE } from "../../../shared/constants";
import GoogleSignInButton from "../../../shared/components/GoogleSignInButton/GoogleSignInButton";
import CustomizedTextField from "../../../shared/components/TextField/CustomizedTextField";

const SignInForm = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Grid2 container className={`${style.signIn__container}`}>
      <Grid2 md={6} className={`${style.signIn__formContainer}`}>
        <div className={`${style.signIn__formSection}`}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={`${style.signIn__form}`}
          >
            <h1 className={`${style.signIn__title}`}>{TITLE.SIGN_IN}</h1>
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

          <div className={`${style.divider__container}`}>
            <Divider
              className={`${style.divider}`}
              textAlign="center"
              sx={{ width: "100%" }}
              flexItem
            >
              {TITLE.OR}
            </Divider>
          </div>
          <GoogleSignInButton />

          <div className={`${style.registerSuggestion__container}`}>
            <span>
              Bạn chưa có tài khoản?{" "}
              <a href="#" className={`${style.registerSuggestion__signUpLink}`}>
                Hãy đăng ký tại đây!
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
