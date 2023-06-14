import { Modal } from "@mui/material";
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

const UpsertMentorModal = (props) => {
  const { handleSubmit, register, setValue, getValues } = useForm();
  const { setLoading } = useCustomLoading();
  const { setNotification } = useNotification();
  const { getLatestSpeakerList } = useFetchSpeakerList();

  const [type, setType] = useState(MODAL_TYPE.ADD);

  useEffect(() => {
    if (props.existedData) {
      setValue("fullName", props.existedData.fullName);
      setValue("email", props.existedData.email);
      setValue("phoneNum", props.existedData.phoneNum);

      setType(MODAL_TYPE.EDIT);
    }
  }, [props.openModal]);

  const onSubmit = async () => {
    const fullForm = { ...getValues() };

    let specificForm = Object.fromEntries(
      // eslint-disable-next-line no-unused-vars
      Object.entries(fullForm).filter(([_, v]) => v != null)
    );

    try {
      setLoading(true);
      if (type === MODAL_TYPE.EDIT) {
        await userAccountService.updateUserProfile(
          props.existedData.id,
          specificForm
        );
      } else if (type === MODAL_TYPE.ADD) {
        await accountService.createMentor(specificForm);
      }

      await getLatestSpeakerList();
      setNotification({
        isOpen: true,
        type: "success",
        message: COMMON_MESSAGE.ADD_MENTOR_SUCCESS,
      });
      if (props.onSuccess) {
        props.onSuccess();
      }
      props.onCloseModal();
    } catch (error) {
      console.log(error);

      setNotification({
        isOpen: true,
        type: "error",
        message: ERROR_MESSAGES.COMMON_ERROR,
      });
    } finally {
      setLoading(false);
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
            <h2>Thêm diễn giả</h2>
            <CustomizedTextField
              name={"Họ và tên"}
              required={true}
              placeholder={PLACE_HOLDER.DEFAULT_NAME}
              options={{
                ...register("fullName"),
              }}
            />
            <CustomizedTextField
              name={"Email"}
              required={true}
              placeholder={PLACE_HOLDER.DEFAULT_EMAIL}
              options={{
                ...register("email"),
              }}
            />
            <CustomizedTextField
              name={"Số điện thoại"}
              placeholder={PLACE_HOLDER.DEFAULT_PHONE}
              options={{
                ...register("phoneNum"),
              }}
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
