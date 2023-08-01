import { useForm } from "react-hook-form";
import CustomizedTextField from "../../../shared/components/TextField/CustomizedTextField";
import CustomizedSelect from "../../../shared/components/Select/CustomizedSelect";
import style from "./AddTopicModal.module.scss";
import {
  ADD_TOPIC,
  BUTTON_LABEL,
  ERROR_MESSAGES,
  TITLE,
} from "../../../shared/constants/common";
import { Modal, Typography } from "@mui/material";
import CustomizedButton from "../../../shared/components/Button/CustomizedButton";
import {
  useCustomLoading,
  useFetchTopicFieldsAndCategories,
  useNotification,
} from "../../../Helpers/generalHelper";
import { useEffect, useState } from "react";
import { topicService } from "../../../Services/topicService";
import { modalFieldValidation } from "../../../shared/constants/validationRules";

const AddTopicModal = (props) => {
  const {
    register,
    watch,
    handleSubmit,
    getValues,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const { getTopicCategories, getTopicFields } =
    useFetchTopicFieldsAndCategories();
  const { setLoading } = useCustomLoading();
  const { setNotification } = useNotification();

  const [fields, setFields] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedField, setSelectedField] = useState();
  const [selectedCategory, setSelectedCategory] = useState();
  const [topicId, setTopicId] = useState();

  useEffect(() => {
    const getFieldsAndCategories = async () => {
      setFields(await getTopicFields());
      setCategories(await getTopicCategories());
    };

    getFieldsAndCategories();
  }, []);

  useEffect(() => {
    clearData();

    if (props.existedData) {
      setValue("name", props.existedData.name);
      setValue("description", props.existedData.description);

      setSelectedCategory({
        id: props.existedData.categoryId,
        name: props.existedData.category,
      });
      setSelectedField({
        id: props.existedData.fieldId,
        name: props.existedData.field,
      });

      setTopicId(props.existedData.id);
    }
  }, [props.openModal]);

  const clearData = () => {
    reset();
    setSelectedCategory();
    setSelectedField();
  };

  const handleCategoryChange = (event) => {
    const {
      target: { value },
    } = event;

    setSelectedCategory(value);
  };

  const handleFieldChange = (event) => {
    const {
      target: { value },
    } = event;

    setSelectedField(value);
  };

  const onSubmit = async () => {
    const formValue = getValues();

    let topic = {
      name: formValue.name,
      description: formValue.description,
      fieldId: selectedField.id,
      categoryId: selectedCategory.id,
    };

    try {
      setLoading(true);

      await topicService.upsertTopic(topic, topicId);
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
              {topicId ? (
                <Typography marginY={3} variant="h4" color="#1a237e">
                  {TITLE.EDIT_TOPIC}
                </Typography>
              ) : (
                <Typography marginY={3} variant="h4" color="#1a237e">
                  {TITLE.CREATE_TOPIC}
                </Typography>
              )}

              <CustomizedTextField
                name={ADD_TOPIC.TOPIC_NAME}
                required={true}
                options={{
                  ...register("name", modalFieldValidation),
                }}
                helperText={errors?.seminarName?.message}
              />

              <CustomizedTextField
                name={ADD_TOPIC.DESCRIPTION}
                required={true}
                options={{
                  ...register("description", modalFieldValidation),
                }}
                multiline={true}
                watch={watch("description")}
                helperText={errors?.description?.message}
              />

              <CustomizedSelect
                inputId={"category"}
                name={ADD_TOPIC.CATEGORY}
                items={categories}
                required={true}
                value={selectedCategory?.name ?? ""}
                onChange={handleCategoryChange}
                renderValue={() => selectedCategory.name}
              />

              <CustomizedSelect
                inputId={"field"}
                name={ADD_TOPIC.FIELD}
                items={fields}
                required={true}
                value={selectedField?.name ?? ""}
                onChange={handleFieldChange}
                renderValue={() => selectedField.name}
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
                  {topicId ? BUTTON_LABEL.SAVE_EDIT : BUTTON_LABEL.CREATE_TOPIC}
                </CustomizedButton>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AddTopicModal;
