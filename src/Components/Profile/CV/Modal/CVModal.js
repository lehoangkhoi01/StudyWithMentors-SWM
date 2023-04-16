import { Modal } from "@mui/material";

import style from "./CVModal.module.scss";
import CustomizedButton from "../../../../shared/components/Button/CustomizedButton";
import {
  BUTTON_LABEL,
  CV_REGISTER_NAME_PREFIX,
  DATE_FORMAT,
  INPUT_TYPES,
  MODAL_TYPE,
} from "../../../../shared/constants/common";
import CustomizedTextField from "../../../../shared/components/TextField/CustomizedTextField";
import CustomizedDatePicker from "../../../../shared/components/DatePicker/CustomizedDatePicker";
import CustomizedCheckBox from "../../../../shared/components/CheckBox/CustomizedCheckBox";
import { useEffect, useState } from "react";
import { getRegisterNamePrefixFromTitle } from "../../../../Helpers/SpecificComponentHelper/CVHelper";
import { covertToISODate } from "../../../../Helpers/dateHelper";

const CVModal = (props) => {
  const { register, setValue, watch, getValues } = props;
  const [registerNamePrefix, setRegisterNamePrefix] = useState();
  const [type, setType] = useState(MODAL_TYPE.ADD);

  useEffect(() => {
    props.reset();

    if (!props.openModal) return;
    const registerNamePrefixRaw = getRegisterNamePrefixFromTitle(props.title);
    setRegisterNamePrefix(registerNamePrefixRaw);

    if (props.existedData) {
      if (registerNamePrefixRaw === CV_REGISTER_NAME_PREFIX.INTRODUCION) {
        setValue(`${registerNamePrefixRaw}_description`, props.existedData);
      } else {
        Object.keys(props.existedData).map((key) => {
          setValue(`${registerNamePrefixRaw}_${key}`, props.existedData[key]);
        });
      }

      setType(MODAL_TYPE.EDIT);
      console.log(getValues());
    } else {
      setType(MODAL_TYPE.ADD);
      console.log(getValues());
    }
  }, [props.openModal]);

  const handleSubmit = () => {
    props.handleSubmit(registerNamePrefix);
  };

  return (
    <div className={style.container}>
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
                  value={covertToISODate(
                    DATE_FORMAT.YYYY_MM_DD,
                    getValues(textField.registerName)
                  )}
                />
              );
            } else if (textField.type === INPUT_TYPES.CHECK_BOX) {
              return (
                <CustomizedCheckBox
                  key={`CV_MODAL_INPUT_${index}`}
                  className={style.modal__input}
                  name={textField.name}
                  options={{ ...register(textField.registerName) }}
                  value={getValues(textField.registerName)}
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
              {type === MODAL_TYPE.EDIT
                ? BUTTON_LABEL.CANCEL_EDIT
                : BUTTON_LABEL.CANCEL}
            </CustomizedButton>
            <CustomizedButton
              type="submit"
              variant="contained"
              color="primary600"
              onClick={handleSubmit}
            >
              {type === MODAL_TYPE.EDIT
                ? BUTTON_LABEL.SAVE_EDIT
                : BUTTON_LABEL.ADD}
            </CustomizedButton>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CVModal;
