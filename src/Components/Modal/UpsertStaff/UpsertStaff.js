import { Modal, Typography } from "@mui/material";
import style from "./UpsertStaff.module.scss";
import { useSelector } from "react-redux";
import { selectDepartments } from "../../../Store/slices/departmentSlice";
import CustomizedSelect from "../../../shared/components/Select/CustomizedSelect";
import {
  COMMON_MESSAGE,
  BUTTON_LABEL,
  ERROR_MESSAGES,
  MODAL_TYPE,
  PLACE_HOLDER,
} from "../../../shared/constants/common";
import { useForm } from "react-hook-form";
import {
  useCustomLoading,
  useNotification,
} from "../../../Helpers/generalHelper";
import { useEffect, useState } from "react";
import CustomizedTextField from "../../../shared/components/TextField/CustomizedTextField";
import {
  emailValidationRules,
  registerFullNameValidation,
} from "../../../shared/constants/validationRules";
import CustomizedButton from "../../../shared/components/Button/CustomizedButton";
import { accountService } from "../../../Services/accountService";

const UpsertStaff = (props) => {
  const { handleSubmit, register, setValue, getValues, reset } = useForm();
  const { setLoading } = useCustomLoading();
  const { setNotification } = useNotification();
  const departments = useSelector(selectDepartments);

  const [type, setType] = useState(MODAL_TYPE.ADD);
  const [isExistedEmail, setIsExistedEmail] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(departments[0]);

  useEffect(() => {
    if (props.existedData) {
      const departmentId = props.existedData.departmentId;

      const exitedDepartment = departments.filter(
        (department) => department.id === departmentId
      )[0];

      setSelectedDepartment(exitedDepartment);
    } else {
      setSelectedDepartment(departments[0]);
    }
  }, [departments]);

  useEffect(() => {
    reset();
    if (props.existedData) {
      const departmentId = props.existedData.departmentId;

      const exitedDepartment = departments.filter(
        (department) => department.id === departmentId
      )[0];

      setValue("fullName", props.existedData.fullName);
      setValue("email", props.existedData.email);
      setValue("phoneNum", props.existedData.phoneNum);

      setSelectedDepartment(exitedDepartment);
      setType(MODAL_TYPE.EDIT);
    } else {
      setSelectedDepartment(departments[0]);
      setType(MODAL_TYPE.ADD);
    }
  }, [props.openModal]);

  const onSubmit = async () => {
    const fullForm = { ...getValues() };

    let specificForm = Object.fromEntries(
      // eslint-disable-next-line no-unused-vars
      Object.entries(fullForm).filter(([_, v]) => v != null)
    );

    specificForm = { ...specificForm, departmentId: selectedDepartment.id };

    try {
      setLoading(true);
      setIsExistedEmail(false);

      if (type === MODAL_TYPE.EDIT) {
        await accountService.updateStaff(specificForm, props.existedData.id);
      } else if (type === MODAL_TYPE.ADD) {
        await accountService.createStaff(specificForm);
      }

      setNotification({
        isOpen: true,
        type: "success",
        message: COMMON_MESSAGE.ADD_STAFF_SUCCESS,
      });
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

  const handleDepartmentChange = (event) => {
    const {
      target: { value },
    } = event;

    setSelectedDepartment(value);
  };

  return (
    <div className={style.container}>
      <Modal open={props.openModal} onClose={props.onCloseModal}>
        <div className={style.modal}>
          <form
            className={`${style.modal__form}`}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Typography marginY={3} variant="h4" color="#1a237e">
              Thông tin nhân viên
            </Typography>
            <CustomizedTextField
              name={"Họ và tên"}
              required={true}
              placeholder={PLACE_HOLDER.DEFAULT_NAME}
              options={{
                ...register("fullName", registerFullNameValidation),
              }}
            />
            <CustomizedTextField
              name={"Email"}
              required={true}
              placeholder={PLACE_HOLDER.DEFAULT_EMAIL}
              disabled={type === MODAL_TYPE.EDIT}
              options={{
                ...register("email", emailValidationRules),
              }}
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
            />
            <CustomizedSelect
              fullWidth
              items={departments}
              inputId="departmentSelect"
              value={selectedDepartment}
              onChange={handleDepartmentChange}
              placeholder={PLACE_HOLDER.DEFAULT_DEPARTMENT}
              renderValue={() => selectedDepartment.name}
              required={true}
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

export default UpsertStaff;
2;
