import { useForm } from "react-hook-form";
import CustomizedTextField from "../../../shared/components/TextField/CustomizedTextField";
import style from "./UpsertField.module.scss";
import {
  BUTTON_LABEL,
  COMMON_MESSAGE,
  ERROR_MESSAGES,
  TITLE,
  UPSERT_FIELD,
} from "../../../shared/constants/common";
import { Modal, Typography } from "@mui/material";
import CustomizedButton from "../../../shared/components/Button/CustomizedButton";
import {
  useCustomLoading,
  useNotification,
} from "../../../Helpers/generalHelper";
import { useEffect, useState } from "react";
import { topicService } from "../../../Services/topicService";
import { modalFieldValidation } from "../../../shared/constants/validationRules";

const UpsertField = (props) => {
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const { setLoading } = useCustomLoading();
  const { setNotification } = useNotification();

  const [fieldId, setFieldId] = useState();
  const [isExisted, setIsExisted] = useState(false);

  useEffect(() => {
    clearData();
    setIsExisted(false);

    if (props.existedData) {
      setValue("name", props.existedData.name);

      setFieldId(props.existedData.id);
    }
  }, [props.openModal]);

  const clearData = () => {
    reset();
    setFieldId();
  };

  const onSubmit = async () => {
    const formValue = getValues();

    let field = {
      name: formValue.name.trim(),
    };

    try {
      setLoading(true);
      setIsExisted(false);

      if (fieldId) {
        await topicService.updateField(field, fieldId);
        setNotification({
          isOpen: true,
          type: "success",
          message: COMMON_MESSAGE.UPDATE_SUCCESS,
        });
      } else {
        await topicService.createField(field);
        setNotification({
          isOpen: true,
          type: "success",
          message: COMMON_MESSAGE.ADD_FIELD_SUCCESS,
        });
      }

      props.onSuccess();
    } catch (error) {
      if (error.data.includes("Duplicate")) {
        setIsExisted(true);
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

  return (
    <div className={style.container}>
      {props.openModal && (
        <Modal open={props.openModal} onClose={props.onCloseModal}>
          <div className={style.modal}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className={`${style.modal__form}`}
            >
              {fieldId ? (
                <Typography
                  marginY={3}
                  fontWeight={700}
                  fontSize="2rem"
                  textAlign="center"
                  color="#283493"
                >
                  {TITLE.EDIT_FIELD}
                </Typography>
              ) : (
                <Typography
                  marginY={3}
                  fontWeight={700}
                  fontSize="2rem"
                  textAlign="center"
                  color="#283493"
                >
                  {TITLE.CREATE_FIELD}
                </Typography>
              )}
              <CustomizedTextField
                name={UPSERT_FIELD.NAME}
                required={true}
                options={{
                  ...register("name", modalFieldValidation),
                }}
                error={errors.name ? true : false}
                helperText={errors?.name?.message}
              />
              {isExisted && (
                <p className={`${style.modal__error}`}>
                  {ERROR_MESSAGES.EXISTED_FIELD}
                </p>
              )}
              <div className={style.modal__buttons}>
                <CustomizedButton
                  type="submit"
                  variant="outlined"
                  color="primary600"
                  onClick={props.onCloseModal}
                >
                  {fieldId
                    ? BUTTON_LABEL.CANCEL_EDIT
                    : BUTTON_LABEL.CANCEL_CREATE}
                </CustomizedButton>
                <CustomizedButton
                  type="submit"
                  variant="contained"
                  color="primary600"
                >
                  {fieldId ? BUTTON_LABEL.SAVE_EDIT : BUTTON_LABEL.CREATE_FIELD}
                </CustomizedButton>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default UpsertField;
