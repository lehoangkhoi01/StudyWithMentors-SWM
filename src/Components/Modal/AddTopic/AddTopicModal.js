import { useForm } from "react-hook-form";
import CustomizedTextField from "../../../shared/components/TextField/CustomizedTextField";
import CustomizedSelect from "../../../shared/components/Select/CustomizedSelect";
import style from "./AddTopicModal.module.scss";
import {
  ADD_TOPIC,
  BUTTON_LABEL,
  TITLE,
} from "../../../shared/constants/common";
import { Modal } from "@mui/material";
import CustomizedButton from "../../../shared/components/Button/CustomizedButton";
import { useFetchTopicFieldsAndCategories } from "../../../Helpers/generalHelper";
import { useEffect, useState } from "react";

const AddTopicModal = (props) => {
  const { register, watch, handleSubmit, getValues } = useForm();
  const { getTopicCategories, getTopicFields } =
    useFetchTopicFieldsAndCategories();

  const [fields, setFields] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getFieldsAndCategories = async () => {
      setFields(await getTopicFields());
      setCategories(await getTopicCategories());
    };

    getFieldsAndCategories();
  }, []);

  const onSubmit = () => {
    console.log(getValues());
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
              <h1>{TITLE.CREATE_TOPIC}</h1>

              <CustomizedTextField
                name={ADD_TOPIC.TOPIC_NAME}
                required={true}
                options={{
                  ...register("name"),
                }}
              />

              <CustomizedTextField
                name={ADD_TOPIC.DESCRIPTION}
                required={true}
                options={{
                  ...register("description"),
                }}
                multiline={true}
                watch={watch("description")}
              />

              <CustomizedSelect
                name={ADD_TOPIC.CATEGORY}
                items={categories}
                required={true}
                options={{ ...register("category") }}
              />

              <CustomizedSelect
                name={ADD_TOPIC.FIELD}
                items={fields}
                required={true}
                options={{ ...register("field") }}
              />

              <CustomizedTextField
                name={ADD_TOPIC.MONEY}
                required={true}
                type="number"
                options={{
                  ...register("money"),
                }}
              />

              <div className={style.modal__buttons}>
                <CustomizedButton
                  type="submit"
                  variant="text"
                  color="primary600"
                  onClick={props.onCloseModal}
                >
                  {BUTTON_LABEL.CANCEL_CREATE}
                </CustomizedButton>
                <CustomizedButton
                  type="submit"
                  variant="text"
                  color="primary600"
                  //   onClick={props.onDeleteProperty}
                >
                  {BUTTON_LABEL.CREATE_TOPIC}
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
