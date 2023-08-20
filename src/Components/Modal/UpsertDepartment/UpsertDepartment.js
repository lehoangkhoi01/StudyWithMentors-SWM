import { useForm } from "react-hook-form";
import CustomizedTextField from "../../../shared/components/TextField/CustomizedTextField";
import style from "./UpsertDepartment.module.scss";
import {
  BUTTON_LABEL,
  COMMON_MESSAGE,
  ERROR_MESSAGES,
  TITLE,
  UPSERT_DEPARTMENT,
} from "../../../shared/constants/common";
import { Modal, Typography } from "@mui/material";
import CustomizedButton from "../../../shared/components/Button/CustomizedButton";
import {
  useCustomLoading,
  useNotification,
} from "../../../Helpers/generalHelper";
import { useEffect, useState } from "react";
import { departmentService } from "../../../Services/departmentService";
import { modalFieldValidation } from "../../../shared/constants/validationRules";

const UpsertDepartment = (props) => {
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    setValue,
    setError,
    formState: { errors },
  } = useForm();
  const { setLoading } = useCustomLoading();
  const { setNotification } = useNotification();

  const [departmentId, setDepartmentId] = useState();

  useEffect(() => {
    clearData();

    if (props.existedData) {
      setValue("name", props.existedData.name);

      setDepartmentId(props.existedData.id);
    }
  }, [props.openModal]);

  const clearData = () => {
    reset();
    setDepartmentId();
  };

  const onSubmit = async () => {
    const formValue = getValues();

    let department = {
      name: formValue.name.trim(),
    };

    try {
      setLoading(true);

      if (departmentId) {
        await departmentService.updateDepartment(department, departmentId);
        setNotification({
          isOpen: true,
          type: "success",
          message: COMMON_MESSAGE.UPDATE_SUCCESS,
        });
      } else {
        await departmentService.createDepartment(department);
        setNotification({
          isOpen: true,
          type: "success",
          message: COMMON_MESSAGE.ADD_DEPARTMENT_SUCCESS,
        });
      }
      await props.onSuccess();
    } catch (error) {
      if (error.data.includes("Duplicate")) {
        setError("name", {
          type: "custom",
          message: ERROR_MESSAGES.EXISTED_DEPARTMENT,
        });
      } else {
        if (departmentId) {
          setNotification({
            isOpen: true,
            type: "error",
            message: ERROR_MESSAGES.UPDATE_ERROR,
          });
        } else {
          setNotification({
            isOpen: true,
            type: "error",
            message: ERROR_MESSAGES.ADD_DEPARTMENT_FAIL,
          });
        }
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
              {departmentId ? (
                <Typography
                  marginY={3}
                  fontWeight={700}
                  fontSize="2rem"
                  textAlign="center"
                  color="#283493"
                >
                  {TITLE.EDIT_DEPARTMENT}
                </Typography>
              ) : (
                <Typography
                  marginY={3}
                  fontWeight={700}
                  fontSize="2rem"
                  textAlign="center"
                  color="#283493"
                >
                  {TITLE.CREATE_DEPARTMENT}
                </Typography>
              )}

              <CustomizedTextField
                name={UPSERT_DEPARTMENT.NAME}
                required={true}
                options={{
                  ...register("name", modalFieldValidation),
                }}
                error={errors.name ? true : false}
                helperText={errors?.name?.message}
              />
              <div className={style.modal__buttons}>
                <CustomizedButton
                  type="submit"
                  variant="outlined"
                  color="primary600"
                  onClick={props.onCloseModal}
                >
                  {departmentId
                    ? BUTTON_LABEL.CANCEL_EDIT
                    : BUTTON_LABEL.CANCEL_CREATE}
                </CustomizedButton>
                <CustomizedButton
                  type="submit"
                  variant="contained"
                  color="primary600"
                >
                  {departmentId
                    ? BUTTON_LABEL.SAVE_EDIT
                    : BUTTON_LABEL.CREATE_DEPARTMENT}
                </CustomizedButton>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default UpsertDepartment;
