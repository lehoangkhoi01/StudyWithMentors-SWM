import { useForm } from "react-hook-form";
import CustomizedTextField from "../../../shared/components/TextField/CustomizedTextField";
import {
  BUTTON_LABEL,
  COMMON_MESSAGE,
  ERROR_MESSAGES,
  FILL_INFORMATION,
  PLACE_HOLDER,
  TITLE,
} from "../../../shared/constants/common";
import style from "./FillInformation.module.scss";
import CustomizedButton from "../../../shared/components/Button/CustomizedButton";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo, userAction } from "../../../Store/slices/userSlice";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import {
  useCustomLoading,
  useNotification,
} from "../../../Helpers/generalHelper";
import { userAccountService } from "../../../Services/userAccountService";
import { ROUTES } from "../../../shared/constants/navigation";
import { registerFullNameValidation } from "../../../shared/constants/validationRules";
import { Modal } from "@mui/material";

const FillInformation = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const history = useHistory();
  const dispatch = useDispatch();

  const { setLoading } = useCustomLoading();
  const { setNotification } = useNotification();

  const userInfo = useSelector(selectUserInfo);

  useEffect(() => {
    setValue("fullName", userInfo.fullName);
    setValue("phone", userInfo.phone);
    setValue("email", userInfo.email);
  }, []);

  const validatePhoneNum = (phoneNum) => {
    if (phoneNum && (phoneNum.length < 10 || phoneNum.length > 11)) {
      return ERROR_MESSAGES.INVALID_PHONE_NUM;
    } else if (phoneNum && /^\d+$/.test(phoneNum) === false) {
      return ERROR_MESSAGES.INVALID_PHONE_NUM;
    }
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const updatedUserInfo = { ...userInfo, ...data, activateAccount: true };

      const newProfile = await userAccountService.confirmUserProfile(
        updatedUserInfo
      );

      dispatch(userAction.setUserInfo(newProfile));

      setNotification({
        isOpen: true,
        type: "success",
        message: COMMON_MESSAGE.UPDATE_PROFILE_SUCCESS,
      });
    } catch (error) {
      setNotification({
        isOpen: true,
        type: "error",
        message: COMMON_MESSAGE.UPDATE_PROFILE_FAIL,
      });
    } finally {
      setLoading(false);
      history.push(ROUTES.HOME);
    }
  };

  return (
    <div className={style.fillInformation__container}>
      <Modal open={true}>
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
            options={{ ...register("fullName", registerFullNameValidation) }}
            error={errors.fullname ? true : false}
            helperText={errors?.fullname?.message}
          />
          <CustomizedTextField
            className={style.fillInformation__input}
            inputId="phone"
            name={TITLE.PHONE}
            type={"text"}
            options={{
              ...register("phone", {
                validate: (val) => validatePhoneNum(val),
              }),
            }}
            error={errors.phone ? true : false}
            helperText={errors?.phone?.message}
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
      </Modal>
    </div>
  );
};

export default FillInformation;
