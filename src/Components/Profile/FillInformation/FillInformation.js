import { useForm } from "react-hook-form";
import CustomizedTextField from "../../../shared/components/TextField/CustomizedTextField";
import {
  BUTTON_LABEL,
  FILL_INFORMATION,
  GENDER,
  PLACE_HOLDER,
  TITLE,
} from "../../../shared/constants/common";
import CustomTopTitle from "../../Authentication/CustomTopTitle/CustomTopTitle";
import CustomizedSelect from "../../../shared/components/Select/CustomizedSelect";
import style from "./FillInformation.module.scss";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import CustomizedDatePicker from "../../../shared/components/DatePicker/CustomizedDatePicker";
import CustomPattern from "../../../shared/components/CustomPattern/CustomPattern";
import CustomizedButton from "../../../shared/components/Button/CustomizedButton";

const GENDERS = [GENDER.MALE, GENDER.FEMALE, GENDER.OTHER];

const FillInformation = () => {
  const { register, handleSubmit, setValue } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className={style.fillInformation__container}>
      <CustomPattern height={"95%"} />
      <form
        className={style.fillInformation__formSection}
        onSubmit={handleSubmit(onSubmit)}
      >
        <CustomTopTitle title={FILL_INFORMATION.WELCOME} />
        <p>{FILL_INFORMATION.PLEASE_FILL_INFORMATION}</p>
        <CustomizedTextField
          className={style.fillInformation__input}
          inputId="email"
          name={TITLE.EMAIL}
          placeholder={PLACE_HOLDER.DEFAULT_EMAIL}
          required={true}
          type={"email"}
          options={{ ...register("email") }}
        />
        <CustomizedTextField
          className={style.fillInformation__input}
          inputId="fullname"
          name={TITLE.FULL_NAME}
          placeholder={PLACE_HOLDER.DEFAULT_NAME}
          required={true}
          type={"text"}
          options={{ ...register("fullName") }}
        />
        <CustomizedTextField
          className={style.fillInformation__input}
          inputId="phone"
          name={TITLE.PHONE}
          placeholder={PLACE_HOLDER.DEFAULT_PHONE}
          required={true}
          type={"text"}
          options={{ ...register("phone") }}
        />
        <Grid2
          container
          className={`${style.fillInformation__input} ${style.fillInformation__grid}`}
        >
          <Grid2 xs={6}>
            <CustomizedDatePicker
              name={TITLE.DOB}
              placeholder={PLACE_HOLDER.DEFAULT_DOB}
              options={{ ...register("dob") }}
              formName={"dob"}
              setValue={setValue}
            />
          </Grid2>
          <Grid2 xs={6}>
            <CustomizedSelect
              inputId="gender"
              name={TITLE.GENDER}
              type={"text"}
              items={GENDERS}
              options={{ ...register("gender") }}
            />
          </Grid2>
        </Grid2>
        <div className={style.fillInformation__button}>
          <CustomizedButton type="submit" variant="outlined" color="primary600">
            {BUTTON_LABEL.LATER}
          </CustomizedButton>
          <CustomizedButton
            type="submit"
            variant="contained"
            color="primary600"
          >
            {BUTTON_LABEL.SAVE}
          </CustomizedButton>
        </div>
      </form>
    </div>
  );
};

export default FillInformation;
