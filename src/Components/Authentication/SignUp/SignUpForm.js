import { Button, Typography } from "@mui/material";
import style from "./SignUpForm.module.scss";
import { useForm } from "react-hook-form";
import {
  COLOR,
  ERROR_MESSAGES,
  ROUTES,
  SIGN_UP_PLACEHOLDER,
  SIGN_UP_TEXT,
  TITLE,
} from "../../../shared/constants/common";
import GoogleSignInButton from "../../../shared/components/GoogleSignInButton/GoogleSignInButton";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import CustomizedTextField from "../../../shared/components/TextField/CustomizedTextField";
import CustomTopTitle from "../CustomTopTitle/CustomTopTitle";
import CustomDivider from "../CustomDivider/CustomDivider";
import CustomPattern from "../../../shared/components/CustomPattern/CustomPattern";
import ImageSideContainer from "../ImageSideContainer/ImageSideContainer";
import {
  emailValidationRules,
  passwordValidation,
  registerFullNameValidation,
} from "../../../shared/constants/validationRules";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  // const [signUpForm, setSignUpForm] = useState({
  //   fullName: "",
  //   email: "",
  //   password: "",
  //   confirmPassword: "",
  // });

  const onSubmit = (data) => {
    console.log(data);
    //setSignUpForm(data);
  };

  const validationConfirmPassword = (val) => {
    if (!val || val.length == 0) {
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
            <Typography variant="subtitle1" color={COLOR.SYSTEM_RED}>
              {ERROR_MESSAGES.DUPLICATED_EMAIL}
            </Typography>
            <Button
              fullWidth
              type="submit"
              className={`${style.signUp__button}`}
              variant="contained"
            >
              {TITLE.SIGN_UP}
            </Button>
          </form>
          <CustomDivider text={TITLE.OR} />
          <GoogleSignInButton />
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
