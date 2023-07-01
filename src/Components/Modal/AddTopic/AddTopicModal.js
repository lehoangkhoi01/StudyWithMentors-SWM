import { useForm } from "react-hook-form";
import CustomizedTextField from "../../../shared/components/TextField/CustomizedTextField";
import CustomizedSelect from "../../../shared/components/Select/CustomizedSelect";
import style from "./AddTopicModal.module.scss";
import { ADD_TOPIC, BUTTON_LABEL } from "../../../shared/constants/common";

const AddTopicModal = (props) => {
  const { register, watch } = useForm();

  return (
    <div className={style.container}>
      {props.openModal && (
        <Modal open={props.openModal} onClose={props.onCloseModal}>
          <div className={style.modal}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className={`${style.modal__form}`}
            >
              <h1>Tạo chủ đề</h1>

              <CustomizedTextField
                name={ADD_TOPIC.TOPIC}
                required={true}
                options={{
                  ...register("topic"),
                }}
                multiline={true}
                watch={watch(topic)}
              />

              <CustomizedSelect
                name={ADD_TOPIC.SKILL_GROUP}
                items={[]}
                options={{ ...register("skills") }}
              />

              <CustomizedSelect
                name={ADD_TOPIC.MAJOR}
                items={[]}
                options={{ ...register("major") }}
              />

              <CustomizedTextField
                name={ADD_TOPIC.COST}
                required={true}
                options={{
                  ...register("cost"),
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
