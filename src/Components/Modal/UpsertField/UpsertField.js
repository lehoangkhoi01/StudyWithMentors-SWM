import { useForm } from "react-hook-form";
import CustomizedTextField from "../../../shared/components/TextField/CustomizedTextField";
import style from "./UpsertField.module.scss";
import {
  BUTTON_LABEL,
  ERROR_MESSAGES,
  TITLE,
  UPSERT_FIELD,
} from "../../../shared/constants/common";
import { Modal } from "@mui/material";
import CustomizedButton from "../../../shared/components/Button/CustomizedButton";
import {
  useCustomLoading,
  useNotification,
} from "../../../Helpers/generalHelper";
import { useEffect, useState } from "react";
import { topicService } from "../../../Services/topicService";

const UpsertField = (props) => {
  const { register, handleSubmit, getValues, reset, setValue } =
    useForm();
  const { setLoading } = useCustomLoading();
  const { setNotification } = useNotification();

  const [fieldId, setFieldId] = useState();

  useEffect(() => {
    clearData();

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
      name: formValue.name,
    };

    try {
      setLoading(true);

      if (fieldId) {
        await topicService.updateField(field, fieldId);
      } else {
        await topicService.createField(field);
      }
    } catch (error) {
      setNotification({
        isOpen: true,
        type: "error",
        message: ERROR_MESSAGES.COMMON_ERROR,
      });
    } finally {
      setLoading(false);
      props.onSuccess();
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
              <h1>{fieldId ? TITLE.EDIT_FIELD : TITLE.CREATE_FIELD}</h1>

              <CustomizedTextField
                name={UPSERT_FIELD.UPSERT_FIELD}
                required={true}
                options={{
                  ...register("name"),
                }}
              />

              <div className={style.modal__buttons}>
                <CustomizedButton
                  type="submit"
                  variant="outlined"
                  color="primary600"
                  onClick={props.onCloseModal}
                >
                  {BUTTON_LABEL.CANCEL_CREATE}
                </CustomizedButton>
                <CustomizedButton
                  type="submit"
                  variant="contained"
                  color="primary600"
                  //   onClick={props.onDeleteProperty}
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
