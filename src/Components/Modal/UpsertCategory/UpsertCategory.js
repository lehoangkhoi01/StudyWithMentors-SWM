import { useForm } from "react-hook-form";
import CustomizedTextField from "../../../shared/components/TextField/CustomizedTextField";
import style from "./UpsertCategory.module.scss";
import {
  BUTTON_LABEL,
  ERROR_MESSAGES,
  TITLE,
  UPSERT_CATEGORY,
} from "../../../shared/constants/common";
import { Modal } from "@mui/material";
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

  useEffect(() => {
    clearData();

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
      name: formValue.name,
    };

    try {
      setLoading(true);

      if (categoryId) {
        await topicService.updateCategory(category, categoryId);
      } else {
        await topicService.createCategory(category);
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
              <h1>
                {categoryId ? TITLE.EDIT_CATEGORY : TITLE.CREATE_CATEGORY}
              </h1>

              <CustomizedTextField
                name={UPSERT_CATEGORY.NAME}
                required={true}
                options={{
                  ...register("name", modalFieldValidation),
                }}
                helperText={errors?.seminarName?.message}
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
