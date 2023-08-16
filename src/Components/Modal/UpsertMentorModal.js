import { Modal, Typography } from "@mui/material";
import style from "./UpsertMentorModal.module.scss";
import CustomizedTextField from "../../shared/components/TextField/CustomizedTextField";
import {
  BUTTON_LABEL,
  COMMON_MESSAGE,
  ERROR_MESSAGES,
  MODAL_TYPE,
  PLACE_HOLDER,
} from "../../shared/constants/common";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import CustomizedButton from "../../shared/components/Button/CustomizedButton";
import { accountService } from "../../Services/accountService";
import {
  useCustomLoading,
  useFetchSpeakerList,
  useNotification,
} from "../../Helpers/generalHelper";
import { userAccountService } from "../../Services/userAccountService";
import {
  emailValidationRules,
  modalFieldValidation,
} from "../../shared/constants/validationRules";

const UpsertMentorModal = (props) => {
  const { 
    handleSubmit, 
    register, 
    setValue, 
    getValues, 
    reset,
    formState: { errors }, } = useForm();
  const { setLoading } = useCustomLoading();
  const { setNotification } = useNotification();
  const { getLatestSpeakerList } = useFetchSpeakerList();

  const [type, setType] = useState(MODAL_TYPE.ADD);
  const [isExistedEmail, setIsExistedEmail] = useState(false);

  useEffect(() => {
    reset();
    setIsExistedEmail(false);
    if (props.existedData) {
      setValue("fullName", props.existedData.fullName);
      setValue("email", props.existedData.email);
      setValue("phoneNum", props.existedData.phoneNum === "Chưa có" ? null : props.existedData.phoneNum);

      setType(MODAL_TYPE.EDIT);
    } else {
      setType(MODAL_TYPE.ADD);
    }
  }, [props.openModal]);

  const onSubmit = async () => {
    const fullForm = { ...getValues() };

    let specificForm = Object.fromEntries(
      // eslint-disable-next-line no-unused-vars
      Object.entries(fullForm).filter(([_, v]) => v != null)
    );

    specificForm = specificForm.map(item => item?.trim())

    try {
      setLoading(true);
      setIsExistedEmail(false);

      if (type === MODAL_TYPE.EDIT) {
        await userAccountService.updateUserProfile(
          props.existedData.id,
          specificForm
        );
        setNotification({
          isOpen: true,
          type: "success",
          message: COMMON_MESSAGE.UPDATE_MENTOR_SUCCESS,
        });
      } else if (type === MODAL_TYPE.ADD) {
        await accountService.createMentor(specificForm);
        setNotification({
          isOpen: true,
          type: "success",
          message: COMMON_MESSAGE.ADD_MENTOR_SUCCESS,
        });
      }

      await getLatestSpeakerList();

      if (props.onSuccess) {
        props.onSuccess();
      }
      props.onCloseModal();
    } catch (error) {
      if (error.data.includes("already exists")) {
        setIsExistedEmail(true);
      } else {
        setNotification({
          isOpen: true,
          type: "error",
          message: ERROR_MESSAGES.COMMON_ERROR,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const validatePhoneNum = (phoneNum) => {
    if (phoneNum && (phoneNum.length < 10 || phoneNum.length > 11)) {
      return ERROR_MESSAGES.INVALID_PHONE_NUM;
    } else if (phoneNum && /^\d+$/.test(phoneNum) === false) {
      return ERROR_MESSAGES.INVALID_PHONE_NUM;
    }
  };

  return (
    <div className={style.container}>
      <Modal open={props.openModal} onClose={props.onCloseModal}>
        <div className={style.modal}>
          <form
            className={`${style.modal__form}`}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Typography
              marginY={3}
              fontWeight={700}
              fontSize="2rem"
              textAlign="center"
              color="#283493"
            >
              Thông tin diễn giả
            </Typography>
            <CustomizedTextField
              name={"Họ và tên"}
              required={true}
              placeholder={PLACE_HOLDER.DEFAULT_NAME}
              options={{
                ...register("fullName", modalFieldValidation),
              }}
              error={errors.fullName ? true : false}
              helperText={errors?.fullName?.message}
            />
            <CustomizedTextField
              name={"Email"}
              required={true}
              placeholder={PLACE_HOLDER.DEFAULT_EMAIL}
              disabled={type === MODAL_TYPE.EDIT}
              options={{
                ...register("email", emailValidationRules),
              }}
              error={errors.email ? true : false}
              helperText={errors?.email?.message}
            />
            {isExistedEmail && (
              <p className={`${style.modal__error}`}>
                {ERROR_MESSAGES.EXISTED_EMAIL}
              </p>
            )}

            <CustomizedTextField
              name={"Số điện thoại"}
              placeholder={PLACE_HOLDER.DEFAULT_PHONE}
              options={{
                ...register("phoneNum", {
                  validate: (val) => validatePhoneNum(val),
                }),
              }}
              error={errors.phoneNum ? true : false}
              helperText={errors?.phoneNum?.message}
            />
            <div className={style.modal__buttons}>
              <CustomizedButton
                variant="outlined"
                color="primary600"
                onClick={props.onCloseModal}
              >
                {type === MODAL_TYPE.EDIT
                  ? BUTTON_LABEL.CANCEL_EDIT
                  : BUTTON_LABEL.CANCEL_SAVE}
              </CustomizedButton>
              <CustomizedButton
                type="submit"
                variant="contained"
                color="primary600"
              >
                {type === MODAL_TYPE.EDIT
                  ? BUTTON_LABEL.SAVE_EDIT
                  : BUTTON_LABEL.ADD}
              </CustomizedButton>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default UpsertMentorModal;
2;
