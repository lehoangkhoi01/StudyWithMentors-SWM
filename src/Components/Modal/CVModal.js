import { Modal } from "@mui/material";
import { useForm } from "react-hook-form";
import style from "./CVModal.module.scss";
import CustomizedButton from "../../shared/components/Button/CustomizedButton";
import {
  BUTTON_LABEL,
  CV_REGISTER_NAME_PREFIX,
  DATE_FORMAT,
  ERROR_MESSAGES,
  INPUT_TYPES,
  MODAL_TYPE,
} from "../../shared/constants/common";
import CustomizedTextField from "../../shared/components/TextField/CustomizedTextField";
import CustomizedDatePicker from "../../shared/components/DatePicker/CustomizedDatePicker";
import CustomizedCheckBox from "../../shared/components/CheckBox/CustomizedCheckBox";
import { useEffect, useLayoutEffect, useState } from "react";
import {
  getRegisterNamePrefixFromTitle,
  removeRegisterNamePrefix,
} from "../../Helpers/SpecificComponentHelper/CVHelper";
import {
  convertDateFormat,
  covertToISODate,
} from "../../Helpers/dateHelper";

const CVModal = (props) => {
  const [registerNamePrefix, setRegisterNamePrefix] = useState();
  const {
    handleSubmit,
    register,
    setValue,
    watch,
    getValues,
    reset,
    formState: { errors },
  } = useForm();
  const [type, setType] = useState(MODAL_TYPE.ADD);

  useLayoutEffect(() => {
    reset();

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

    const endDateTimeNumber = covertToISODate(
      DATE_FORMAT.MM_YYYY,
      val
    ).getTime();
    const statDateTimeNumber = covertToISODate(
      DATE_FORMAT.MM_YYYY,
      startDateString
    ).getTime();
    const currentDate = new Date().getTime();

    // if (!val || val.length === 0) {
    //   return ERROR_MESSAGES.REQUIRED_FIELD;
    // }
    if (
      endDateTimeNumber < statDateTimeNumber ||
      endDateTimeNumber < currentDate
    ) {
      return ERROR_MESSAGES.INVALID_END_DATE;
    }
  };

  const renderFormOptionForDate = (registerName) => {
    if (registerName.includes("endDate")) {
      return {
        ...register(registerName, {
          validate: {
            checkEndDate: (val) => validateEndDate(val),
          },
        }),
      };
    } else {
      return {
        ...register(registerName),
      };
    }
  };

  const onSubmit = () => {
    const fullForm = { ...getValues() };

    let specificForm = Object.fromEntries(
      // eslint-disable-next-line no-unused-vars
      Object.entries(fullForm).filter(([_, v]) => v != null)
    );

    specificForm = removeRegisterNamePrefix(specificForm, registerNamePrefix);

    Object.keys(specificForm).map((key) => {
      if (key.toLocaleLowerCase().includes("date")) {
        specificForm[key] = convertDateFormat(
          specificForm[key],
          DATE_FORMAT.MM_YYYY,
          DATE_FORMAT.YYYY_MM_DD
        );
      }
    });

    props.handleSubmit(specificForm, registerNamePrefix);
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
                src={require("../../assets/icons/Cancel.png")}
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
                      error={errors[textField.registerName]}
                      formName={textField.registerName}
                      setValue={setValue}
                      value={covertToISODate(
                        DATE_FORMAT.YYYY_MM_DD,
                        getValues(textField.registerName)
                      )}
                      disabled={
                        textField.registerName.includes("endDate")
                          ? getValues(`${registerNamePrefix}_workingHere`) ||
                            getValues(`${registerNamePrefix}_attendingThis`)
                          : false
                      }
                      getValues={getValues}
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
                      optional={textField.optional}
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
                        ...register(textField.registerName),
                      }}
                      error={errors[textField.registerName] ? true : false}
                      helperText={errors[textField.registerName]?.message}
                      type={"text"}
                      watch={watch(textField.registerName)}
                      optional={textField.optional}
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
      )}
    </div>
  );
};

export default CVModal;
