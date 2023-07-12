import { useForm } from "react-hook-form";
import CustomizedTextField from "../../../shared/components/TextField/CustomizedTextField";
import {
  BUTTON_LABEL,
  FILL_INFORMATION,
  PLACE_HOLDER,
  TITLE,
} from "../../../shared/constants/common";
import style from "./FillInformation.module.scss";
import CustomPattern from "../../../shared/components/CustomPattern/CustomPattern";
import CustomizedButton from "../../../shared/components/Button/CustomizedButton";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../../../Store/slices/userSlice";

const FillInformation = () => {
  const { register, handleSubmit, setValue } = useForm();
  const userInfo = useSelector(selectUserInfo);

  useEffect(() => {
    setValue("fullname", userInfo.fullName)
    setValue("phone", userInfo.phone)
  }, [])

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
        <h1>{FILL_INFORMATION.WELCOME} </h1>
        <p>{FILL_INFORMATION.PLEASE_FILL_INFORMATION}</p>
        <CustomizedTextField
          className={style.fillInformation__input}
          inputId="email"
          name={TITLE.EMAIL}
          placeholder={PLACE_HOLDER.DEFAULT_EMAIL}
          required={true}
          type={"email"}
          options={{ ...register("email") }}
          disabled={true}
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
        <div className={style.fillInformation__button}>
          <CustomizedButton
            type="submit"
            variant="contained"
            color="primary600"
          >
            {BUTTON_LABEL.CONFIRM}
          </CustomizedButton>
        </div>
      </form>
    </div>
  );
};

export default FillInformation;
