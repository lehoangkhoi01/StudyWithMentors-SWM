import { Modal } from "@mui/material";
import { useForm } from "react-hook-form";
import style from "./CVModal.module.scss";
import CustomizedButton from "../../../../shared/components/Button/CustomizedButton";
import {
  BUTTON_LABEL,
  CV_REGISTER_NAME_PREFIX,
  DATE_FORMAT,
  ERROR_MESSAGES,
  INPUT_TYPES,
  MODAL_TYPE,
} from "../../../../shared/constants/common";
import CustomizedTextField from "../../../../shared/components/TextField/CustomizedTextField";
import CustomizedDatePicker from "../../../../shared/components/DatePicker/CustomizedDatePicker";
import CustomizedCheckBox from "../../../../shared/components/CheckBox/CustomizedCheckBox";
import { useEffect, useState } from "react";
import { getRegisterNamePrefixFromTitle } from "../../../../Helpers/SpecificComponentHelper/CVHelper";
import { covertToISODate } from "../../../../Helpers/dateHelper";
import { passwordValidation } from "../../../../shared/constants/validationRules";

const CVModal = (props) => {
  //const { register, setValue, watch, getValues, errors } = props;
  const [registerNamePrefix, setRegisterNamePrefix] = useState();
  const {
    handleSubmit,
    register,
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = useForm();
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
    } else {
      setType(MODAL_TYPE.ADD);
    }
  }, [props.openModal]);

  useEffect(() => {
    if (
      watch(`${registerNamePrefix}_workingHere`) ||
      watch(`${registerNamePrefix}_attendingThis`)
    )
      setValue(`${registerNamePrefix}_endDate`, "");
  }, [
    watch(`${registerNamePrefix}_workingHere`),
    watch(`${registerNamePrefix}_attendingThis`),
  ]);

  const validateEndDate = (val) => {
    const formValue = getValues();
    const startDateString = formValue[`${registerNamePrefix}_startDate`];
    if (!val || val.length === 0) {
      return ERROR_MESSAGES.REQUIRED_FIELD;
    }
    if (val !== startDateString) {
      console.log("Error field");
      console.log(val);
      console.log(startDateString);
      return ERROR_MESSAGES.INVALID_END_DATE;
    }
  };

  const renderFormOptionForDate = (registerName) => {
    if (registerName.includes("endDate")) {
      return {
        ...register(registerName, {
          validate: (val) => validateEndDate(val),
        }),
      };
    } else {
      return {
        ...register(registerName),
      };
    }
  };

  const onSubmit = (data) => {
    console.log(data);
    // const startDate = Date.parse(
    //   props.getValues()[`${registerNamePrefix}_endDate`]
    // );
    // console.log(startDate);
    //props.handleSubmit(registerNamePrefix);
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
                      options={renderFormOptionForDate(textField.registerName)}
                      //error={errors[textField.registerName]}
                      formName={textField.registerName}
                      setValue={setValue}
                      value={covertToISODate(
                        DATE_FORMAT.MM_YYYY,
                        getValues(textField.registerName)
                      )}
                      disabled={
                        textField.registerName.includes("endDate")
                          ? getValues(`${registerNamePrefix}_workingHere`) ||
                            getValues(`${registerNamePrefix}_attendingThis`)
                          : false
                      }
                    />
                  );
                } else if (textField.type === INPUT_TYPES.CHECK_BOX) {
                  return (
                    <CustomizedCheckBox
                      key={`CV_MODAL_INPUT_${index}`}
                      className={style.modal__input}
                      name={textField.name}
                      options={{ ...register(textField.registerName) }}
                      getValues={getValues}
                      registerName={textField.registerName}
                      watch={watch(textField.registerName)}
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
                      options={{
                        ...register(textField.registerName, passwordValidation),
                      }}
                      error={errors[textField.registerName] ? true : false}
                      helperText={errors[textField.registerName]?.message}
                      type={"text"}
                      watch={watch(textField.registerName)}
                    />
                  );
                }
              })}

              <div className={style.modal__buttons}>
                <CustomizedButton
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
                >
                  {type === MODAL_TYPE.EDIT
                    ? BUTTON_LABEL.SAVE_EDIT
                    : BUTTON_LABEL.ADD}
                </CustomizedButton>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default CVModal;
