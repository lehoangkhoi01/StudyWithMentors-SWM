import { useEffect, useState } from "react";
import style from "./ConfirmTopicModal.module.scss";
import {
  CONFIRM_TOPIC_MODAL,
  ERROR_MESSAGES,
  MODAL_ACTIVE_PROPERTY,
  OTHERS,
} from "../../../shared/constants/common";
import { Modal } from "@mui/material";
import CustomizedButton from "../../../shared/components/Button/CustomizedButton";
import { topicService } from "../../../Services/topicService";
import {
  useCustomLoading,
  useNotification,
} from "../../../Helpers/generalHelper";

const ConfirmTopicModal = (props) => {
  const { setLoading } = useCustomLoading();
  const { setNotification } = useNotification();

  const [properties, setProperties] = useState({
    confirmButton: "",
    confirm: "",
  });

  const onUpdateTopicStatus = async () => {
    try {
      setLoading(true);
      await topicService.updateStatus(props.existedData.id, props.type);

      props.onSuccess();

      setLoading(false);
    } catch (error) {
      console.log(error);

      setNotification({
        isOpen: true,
        type: "error",
        message: ERROR_MESSAGES.COMMON_ERROR,
      });
    }
  };

  useEffect(() => {
    switch (props.type) {
      case CONFIRM_TOPIC_MODAL.ACCEPT:
        setProperties({
          confirmButton: CONFIRM_TOPIC_MODAL.ACCEPT,
          confirm: CONFIRM_TOPIC_MODAL.ACCEPT_CONFIRM,
        });
        break;
      case CONFIRM_TOPIC_MODAL.REJECT:
        setProperties({
          confirmButton: CONFIRM_TOPIC_MODAL.REJECT,
          confirm: CONFIRM_TOPIC_MODAL.REJECT_CONFIRM,
        });
        break;
      case CONFIRM_TOPIC_MODAL.ARCHIVE:
        setProperties({
          confirmButton: CONFIRM_TOPIC_MODAL.ARCHIVE,
          confirm: CONFIRM_TOPIC_MODAL.ARCHIVE_CONFIRM,
        });
        break;
      default:
        break;
    }
  }, [props.openModal]);

  return (
    <div className={style.container}>
      <Modal open={props.openModal} onClose={props.onCloseModal}>
        <div className={style.modal}>
          <h2>{`${properties.confirm} ${CONFIRM_TOPIC_MODAL.TOPIC} ${props.title} ${OTHERS.THIS}?`}</h2>
          <div className={style.modal__buttons}>
            <CustomizedButton
              type="submit"
              variant="text"
              color="primary600"
              onClick={props.onCloseModal}
            >
              {MODAL_ACTIVE_PROPERTY.BACK}
            </CustomizedButton>
            <CustomizedButton
              type="submit"
              variant="text"
              color="primary600"
              onClick={onUpdateTopicStatus}
            >
              {properties.confirmButton}
            </CustomizedButton>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ConfirmTopicModal;
