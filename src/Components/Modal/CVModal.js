import { Modal, Typography } from "@mui/material";
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
import { convertDateFormat, covertToISODate } from "../../Helpers/dateHelper";

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
  const [isWorking, setIsWorking] = useState(false);

  useLayoutEffect(() => {
    reset();
    setIsWorking(false);

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
    ) {
      setValue(`${registerNamePrefix}_endDate`, null);
      setIsWorking(true);
    }
  }, [
    watch(`${registerNamePrefix}_workingHere`),
    watch(`${registerNamePrefix}_attendingThis`),
  ]);

  const validateEndDate = (val) => {
    if (!isWorking) {
      if (!val || val.length === 0) {
        return ERROR_MESSAGES.REQUIRED_FIELD;
      }

      const formValue = getValues();
      const startDateString = formValue[`${registerNamePrefix}_startDate`];

      const endDateTime = covertToISODate(DATE_FORMAT.MM_YYYY, val);

      const startDateTime = covertToISODate(
        DATE_FORMAT.MM_YYYY,
        startDateString
      );
      const endDateTimeNumber = endDateTime.getTime();
      const startDateTimeNumber = startDateTime.getTime();

      if (endDateTimeNumber < startDateTimeNumber) {
        return ERROR_MESSAGES.END_DATE_CAN_NOT_BE_EALIER_THAN_START_DATE;
      }
    }
  };

  const validateDueDate = (val) => {
    if (!isWorking) {
      if (!val || val.length === 0) {
        return ERROR_MESSAGES.REQUIRED_FIELD;
      }

      const formValue = getValues();
      const issuedDateString = formValue[`${registerNamePrefix}_achievingDate`];

      const dueDateTime = covertToISODate(DATE_FORMAT.MM_YYYY, val);

      const issuedDateTime = covertToISODate(
        DATE_FORMAT.MM_YYYY,
        issuedDateString
      );
      const dueDateTimeNumber = dueDateTime.getTime();
      const issuedDateTimeNumber = issuedDateTime.getTime();

      if (dueDateTimeNumber < issuedDateTimeNumber) {
        return ERROR_MESSAGES.EXPIRED_DATE_CAN_NOT_BE_EALIER_THAN_ACHIEVING_DATE;
      }
    }
  };

  const validateStartDate = (val) => {
    if (!val || val.length === 0) {
      return ERROR_MESSAGES.REQUIRED_FIELD;
    }

    const startDateTime = covertToISODate(DATE_FORMAT.MM_YYYY, val);

    const currentDate = new Date().getTime();

    const startDateTimeNumber = startDateTime.getTime();
    if (startDateTimeNumber > currentDate) {
      return ERROR_MESSAGES.INVALID_END_DATE;
    }
  };

  const renderFormOptionForDate = (registerName) => {
    if (registerName.includes("endDate") && !registerName.includes("learningExps_endDate")) {
      return {
        ...register(registerName, {
          validate: {
            checkEndDate: (val) => validateEndDate(val),
          },
        }),
      };
    } else if (registerName.includes("startDate")) {
      return {
        ...register(registerName, {
          validate: {
            checkEndDate: (val) => validateStartDate(val),
          },
        }),
      };
    } else if (registerName.includes("expiryDate")) {
      return {
        ...register(registerName, {
          validate: {
            checkEndDate: (val) => validateDueDate(val),
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
          DATE_FORMAT.BACK_END_YYYY_MM_DD
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
              <Typography
                marginY={3}
                fontWeight={700}
                fontSize="2rem"
                textAlign="center"
                color="#283493"
              >
                {props.title}
              </Typography>
              {props.textFields.map((textField, index) => {
                if (textField.type === INPUT_TYPES.DATE) {
                  return (
                    <CustomizedDatePicker
                      disableFuture={textField.disableFuture}
                      key={`CV_MODAL_INPUT_${index}`}
                      className={style.modal__input}
                      name={textField.name}
                      required={!textField.optional}
                      options={renderFormOptionForDate(textField.registerName)}
                      error={errors[textField.registerName]}
                      formName={textField.registerName}
                      setValue={setValue}
                      value={covertToISODate(
                        DATE_FORMAT.BACK_END_YYYY_MM_DD,
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
