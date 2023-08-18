import { useForm } from "react-hook-form";
import CustomizedTextField from "../../../shared/components/TextField/CustomizedTextField";
import style from "./UpsertCategory.module.scss";
import {
  BUTTON_LABEL,
  COMMON_MESSAGE,
  ERROR_MESSAGES,
  TITLE,
  UPSERT_CATEGORY,
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

const UpsertCategory = (props) => {
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

  const [categoryId, setCategoryId] = useState();
  const [isExisted, setIsExisted] = useState(false);

  useEffect(() => {
    clearData();
    setIsExisted(false);

    if (props.existedData) {
      setValue("name", props.existedData.name);

      setCategoryId(props.existedData.id);
    }
  }, [props.openModal]);

  const clearData = () => {
    reset();
    setCategoryId();
  };

  const onSubmit = async () => {
    const formValue = getValues();

    let category = {
      name: formValue.name.trim(),
    };

    try {
      setLoading(true);
      setIsExisted(false);

      if (categoryId) {
        await topicService.updateCategory(category, categoryId);
        setNotification({
          isOpen: true,
          type: "success",
          message: COMMON_MESSAGE.UPDATE_SUCCESS,
        });
      } else {
        await topicService.createCategory(category);
        setNotification({
          isOpen: true,
          type: "success",
          message: COMMON_MESSAGE.ADD_CATEGORY_SUCCESS,
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
              {categoryId ? (
                <Typography
                  marginY={3}
                  fontWeight={700}
                  fontSize="2rem"
                  textAlign="center"
                  color="#283493"
                >
                  {TITLE.EDIT_CATEGORY}
                </Typography>
              ) : (
                <Typography
                  marginY={3}
                  fontWeight={700}
                  fontSize="2rem"
                  textAlign="center"
                  color="#283493"
                >
                  {TITLE.CREATE_CATEGORY}
                </Typography>
              )}

              <CustomizedTextField
                name={UPSERT_CATEGORY.NAME}
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
                  {categoryId
                    ? BUTTON_LABEL.CANCEL_EDIT
                    : BUTTON_LABEL.CANCEL_CREATE}
                </CustomizedButton>
                <CustomizedButton
                  type="submit"
                  variant="contained"
                  color="primary600"
                >
                  {categoryId
                    ? BUTTON_LABEL.SAVE_EDIT
                    : BUTTON_LABEL.CREATE_CATEGORY}
                </CustomizedButton>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default UpsertCategory;
