import { Modal } from "@mui/material";

import style from "./CVModal.module.scss";
import CustomizedButton from "../../../../shared/components/Button/CustomizedButton";
import {
  BUTTON_LABEL,
  INPUT_TYPES,
  MODAL_TYPE,
} from "../../../../shared/constants/common";
import CustomizedTextField from "../../../../shared/components/TextField/CustomizedTextField";
import CustomizedDatePicker from "../../../../shared/components/DatePicker/CustomizedDatePicker";
import CustomizedCheckBox from "../../../../shared/components/CheckBox/CustomizedCheckBox";
import { useEffect, useState } from "react";

const CVModal = (props) => {
  const { register, setValue, watch } = props;
  const [type, setType] = useState(MODAL_TYPE.ADD);

  useEffect(() => {
    if (!props.openModal) return;

    setType(props.existedData ? MODAL_TYPE.EDIT : MODAL_TYPE.ADD);
    console.log(type);
    console.log(props.textFields);
    props.getValues();
  }, [props.openModal]);

  const handleSubmit = (type) => {
    props.handleSubmit(type);
  };
  return (
    <>
      <Modal open={props.openModal} onClose={props.onCloseModal}>
        <div className={style.modal}>
          <img
            className={style.modal__cancel}
            onClick={props.onCloseModal}
            src={require("../../../../assets/icons/Cancel.png")}
          />
          <h1>{props.title}</h1>
          {props.textFields.map((textField, index) => {
            if (textField.type === INPUT_TYPES.DATE) {
              return (
                <CustomizedDatePicker
                  key={`CV_MODAL_INPUT_${index}`}
                  className={style.modal__input}
                  name={textField.name}
                  required={!textField.optional}
                  options={{ ...register(textField.registerName) }}
                  formName={textField.registerName}
                  setValue={setValue}
                />
              );
            } else if (textField.type === INPUT_TYPES.CHECK_BOX) {
              return (
                <CustomizedCheckBox
                  key={`CV_MODAL_INPUT_${index}`}
                  className={style.modal__input}
                  name={textField.name}
                  options={{ ...register(textField.registerName) }}
                />
              );
            } else {
              return (
                <CustomizedTextField
                  key={`CV_MODAL_INPUT_${index}`}
                  className={style.modal__input}
                  name={textField.name}
                  required={!textField.optional}
                  multiline={textField.type === INPUT_TYPES.TEXT_AREA}
                  options={{ ...register(textField.registerName) }}
                  type={"text"}
                  watch={watch(textField.registerName)}
                />
              );
            }
          })}

          <div className={style.modal__buttons}>
            <CustomizedButton
              type="submit"
              variant="outlined"
              color="primary600"
              onClick={props.onCloseModal}
            >
              {BUTTON_LABEL.CANCEL}
            </CustomizedButton>
            <CustomizedButton
              type="submit"
              variant="contained"
              color="primary600"
              onClick={() => {
                handleSubmit(props.title);
              }}
            >
              {type === MODAL_TYPE.EDIT
                ? BUTTON_LABEL.SAVE_EDIT
                : BUTTON_LABEL.ADD}
            </CustomizedButton>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CVModal;
